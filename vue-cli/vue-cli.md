### 安装

- Mac 下修改 npm 全局包安装位置

  1. 修改全局包位置 - xxx代表创建的新目录

  ```shell
  npm config set prefix 'xxx'
  npm config set cache 'xxx'
  ```

  2. 查看修改结果

  ```shell
  npm config get prefix
  ```

  3. 配置环境变量

  ```shell
  vim ~/.bash_profile
  
  export PATH = xxx/bin:$PATH
  
  source ~/.bash_profile
  ```

- 全局安装脚手架

  ```shell
  npm i vue-cli -g
  ```

### 初始化



