import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetsDirectory = path.resolve('src/assets');
const sourceImagePattern = /\.(png|jpe?g)$/i;
const productImagePattern = /^(acacia honey|forest honey|stingless be honey)/i;
const iconImagePattern = /^(lebah|qris)/i;
const files = (await readdir(assetsDirectory)).filter((file) => sourceImagePattern.test(file));

await Promise.all(
  files.map(async (file) => {
    const source = path.join(assetsDirectory, file);
    const target = path.join(assetsDirectory, file.replace(sourceImagePattern, '.webp'));
    const isProductImage = productImagePattern.test(file);
    const isIconImage = iconImagePattern.test(file);

    await sharp(source)
      .resize({ width: isIconImage ? 256 : isProductImage ? 900 : 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(target);

    console.log(`Optimized ${file}`);
  }),
);
