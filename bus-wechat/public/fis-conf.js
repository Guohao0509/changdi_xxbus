//是否开启文件指纹
fis.match('*', {
  useHash: false
});

fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});

fis.match('::packager', {
  spriter: fis.plugin('csssprites')
});

fis.match('*.html', {
  optimizer: fis.plugin('html-compress')
})

fis.match('*.css', {
  useSprite: true,
  optimizer: fis.plugin('clean-css'),
  packTo: '/static/aio.css'
});

fis.match('*.js', {
  optimizer: fis.plugin('uglify-js',{
    mangle:false,//不开启变量混淆
  }),
  packTo: '/static/aio.js'
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});


//压缩js，节省代码体积
fis.match('*.js', {
  
});
//压缩css
fis.match('*.css', {
  
});
//压缩png图片

//压缩html代码
