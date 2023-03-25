const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

const upload = async (ctx) => {
  try {
    const { file } = ctx.request.files;
    const { fileType } = ctx.request.body;

    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileName = `${fileType}_${Date.now()}.jpg`;
    const filePath = `${path.join(__dirname, '../../upload')}/${fileName}`;
    const upStream = fs.createWriteStream(filePath);

    const reader = fs.createReadStream(file.path);
    reader.pipe(upStream);

    upStream.on('finish', () => {
      fs.chmod(filePath, 0o777, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    let rst = fileName;

    if (fileType === 'project') {
      // 添加水印
      const watermarkPath = `${path.join(__dirname, './watermark.png')}`;
      const image = await jimp.read(filePath);
      const watermark = await jimp.read(watermarkPath);

      const watermarkWidth = 326.75;
      const watermarkHeight = 26.75;
      const watermarkX = Math.floor((image.bitmap.width - watermarkWidth) / 2);
      const watermarkY = Math.floor((image.bitmap.height - watermarkHeight) / 2);

      image.composite(watermark, watermarkX, watermarkY, {
        mode: jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5
      });

      await image.writeAsync(filePath);
    }

    ctx.body = {
      code: rst ? 0 : 1,
      msg: !rst || !rst.length ? '没有匹配的查询结果' : '',
      data: rst || [],
    };
  } catch (err) {
    ctx.logger.error(err);
    ctx.body = {
      code: 1,
      msg: 'error',
      data: [],
    };
  }
};

module.exports = {
  'POST /upload': upload,
};
