# apifox 使用说明

## 功能

制定接口和数据模型文档；  
自动生成相关接口和类型前后端代码；  
mock数据；  
测试；  
加快开发效率。  

## 教程

下载apifox，并安装java；  
声明接口和数据模型，数据模型 string点击更多，可选择枚举；  
编辑前注意右上角刷新项目，apifox同步不太稳定；  
生成前端代码：点击项目概览，生成代码，Typescript,Axios;  
选择自定义模版，选择目录为typescript-axios文件夹；  
（xx项目中应用的ts生成模版见typescript-axios，基于官方的改版）；  
调用的request方法，在项目中自定义实现；  
选择整个项目，代码模块 全部，选择保存目录；  
代码风格勾选：ensureUniqueParams，legacyDiscriminatorBehavior，sortParamsByRequiredFlag，supportsES6，其他都关闭；  
enumNameSuffix，enumPropertyNaming，modelPropertyNaming选择original；   
点击保存配置；  
生成代码（生成前删除旧的代码文件夹，防止遗留文件）；  
删除一些无效的文件；  
lint生成的代码；  
git提交代码；  

TBD： 支持npm script或脚本自动完成更新代码；  

## 注意事项

在apifox项目中创建文档说明接口字段的定义规范；  
按模块分类；  
所有对象创建为数据模型，避免生成代码包含过多随机命名的类型；  
（避坑）所有字段不能勾选nullable，否则生成代码会出现问题；  
（避坑）formData字段不能使用下划线，当前会自动转换成小驼峰；

## 推荐流程

需求评审->设计（前后端充分理解需求完成文档制定，减少后期改动）->
mock开发->联调->自测