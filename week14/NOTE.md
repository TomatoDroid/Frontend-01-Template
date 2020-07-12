# 每周总结可以写在这里

`@babel/plugin-transform-react-jsx`会将jsx翻译成渲染函数，默认的函数名是React.createElement(),可以通过配置loader的plugins配置`{ pragma: "createElement" },`

jsx树形结构的构建是先子后父