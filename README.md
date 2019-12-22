# myPaint -v27
## 改进功能
- Model
  - 填充颜色功能
  - 对样式进行修改
  - 删除功能
  - 移动功能

---

This is a web app to draw shapes, it is based on following skills
- Frontend: JavaScript, H5, CSS
- Backend: Go

Architecture and project structure
- paintweb (frontend)
- paintdom (backend)

Pattern used
- MVC


## TIPS
- HTML里的javasript加载是有顺序的
  - 不按顺序有可能，会有运行时错误（找不到对象）

- Chrome调试时，不更新缓存（e.g.: 还是上一次老的JS脚本）
  - [StackExchange solution](https://superuser.com/questions/1195404/force-google-chrome-to-check-for-new-javascript-files-every-time-i-access-a-web?answertab=votes#tab-top)
  - Quick shortcut - Force reload: ` ctrl + shift + r`


- Git set different users 
  - [Stackoverflow](https://stackoverflow.com/questions/4220416/can-i-specify-multiple-users-for-myself-in-gitconfig)