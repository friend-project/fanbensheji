const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const upload = async (ctx) => {
  try {
    const { file } = ctx.request.files;
    const { fileType } = ctx.request.body;
    const fileName = `${fileType}_${Date.now()}_.${file.name.split('.').pop().toLowerCase()}`;
    const filePath = path.join(__dirname, '../../upload', fileName);
    const watermarkPath = path.join(__dirname, './watermark/watermark.png');

    // 上传并添加水印
    if (fileType === 'project') {
      await sharp(file.path)
        .composite([{ input: watermarkPath, top: 100, left: 100 }])
        .composite([{ input: watermarkPath, gravity: 'center' }]) // 添加水印
        .toFile(filePath); // 输出到文件
    } else {
      await sharp(file.path).toFile(filePath);
    }

    const rst = fileName;

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
