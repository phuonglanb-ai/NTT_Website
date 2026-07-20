import sharp from "sharp";

const MAX_WIDTH = 2000;
const JPEG_QUALITY = 85;

/**
 * Tao ban hien thi web tu anh goc: gioi han chieu rong, encode lai JPEG.
 * sharp KHONG giu EXIF khi encode lai (chi giu neu goi .withMetadata(),
 * ta khong goi) -- tu dong dat yeu cau "loai metadata nhay cam" cua
 * security-requirements.md. .rotate() ap dung huong xoay EXIF truoc khi
 * metadata bi bo, tranh anh bi lech huong.
 */
export async function createWebRendition(
  input: Buffer,
): Promise<{ buffer: Buffer; contentType: string }> {
  const oriented = sharp(input).rotate();
  const metadata = await oriented.metadata();

  const pipeline =
    metadata.width && metadata.width > MAX_WIDTH
      ? oriented.resize({ width: MAX_WIDTH })
      : oriented;

  const buffer = await pipeline.jpeg({ quality: JPEG_QUALITY }).toBuffer();

  return { buffer, contentType: "image/jpeg" };
}
