import sys, numpy as np, cv2, mediapipe as mp
src, out_png, out_dbg = sys.argv[1], sys.argv[2], sys.argv[3]
img = cv2.imread(src); h, w = img.shape[:2]
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
with mp.solutions.selfie_segmentation.SelfieSegmentation(model_selection=0) as seg:
    prob = seg.process(rgb).segmentation_mask            # float 0..1, same size as input
prob = cv2.GaussianBlur(prob, (0, 0), 3)
# trimap from the model's probability, then GrabCut to snap to real edges (hair, collar, shoulders)
mask = np.full((h, w), cv2.GC_PR_BGD, np.uint8)
mask[prob > 0.35] = cv2.GC_PR_FGD
mask[prob > 0.85] = cv2.GC_FGD
mask[prob < 0.08] = cv2.GC_BGD
bgd = np.zeros((1, 65)); fgd = np.zeros((1, 65))
cv2.grabCut(img, mask, None, bgd, fgd, 6, cv2.GC_INIT_WITH_MASK)
fg = ((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD)).astype(np.uint8)
# keep the largest connected component, fill holes
n, lab, stats, _ = cv2.connectedComponentsWithStats(fg, 8)
if n > 1:
    big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]); fg = (lab == big).astype(np.uint8)
inv = 1 - fg; n2, lab2, st2, _ = cv2.connectedComponentsWithStats(inv, 8)
for i in range(1, n2):
    if st2[i, cv2.CC_STAT_AREA] < 4000: fg[lab2 == i] = 1
# soft, slightly eroded alpha so no wall halo survives
fg = cv2.erode(fg, np.ones((3, 3), np.uint8), iterations=1)
alpha = cv2.GaussianBlur(fg.astype(np.float32), (0, 0), 1.6)
alpha = np.clip((alpha - 0.15) / 0.7, 0, 1)
rgba = np.dstack([img, (alpha * 255).astype(np.uint8)])
cv2.imwrite(out_png, rgba)
# debug: composite on navy
navy = np.zeros_like(img); navy[:] = (0x24, 0x17, 0x0B)
comp = (img * alpha[..., None] + navy * (1 - alpha[..., None])).astype(np.uint8)
cv2.imwrite(out_dbg, comp)
print("done", float(alpha.mean()))
