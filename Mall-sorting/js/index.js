~function () {
  // 获取数据
  let DATE = null;
  const xhr=new XMLHttpRequest();
  xhr.open('get','./json/date.json',false);
  xhr.onreadystatechange=function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
      DATE = this.responseText
    }
  }
  xhr.send();
  DATE = JSON.parse(DATE)
  // 生成模板
  let htmlStr = ''
  DATE.forEach(({ title, price, heat, time }) => {
    // 设置自定义属性,方便排序调用,标签上设置,一律通过getAttribute获取
    htmlStr += `
    <div class="card m-3" style="width: 18rem;" data-price="${price}" data-heat="${heat}" data-time="${time}">
        <img src="holder.js/100px200?random=yes" class="card-img-top" alt="...">
        <div class="card-body">
          <h3>${title}</h3>
          <p class="card-text fw-lighter my-0">价格:￥${price}</p>
          <p class="card-text fw-lighter my-0">热度:${heat}</p>
          <p class="card-text fw-lighter my-0">上架时间:${time}</p>
        </div>
      </div>
    `
  });
  // 放入页面
  const goods = document.querySelector('.goods')
  goods.innerHTML = htmlStr
  // 商品排序
  const buts = document.querySelectorAll('.navbar-nav li')
  let cardList = [...goods.querySelectorAll('.card')]
    ;[].forEach.call(buts, item => {
      item['data-type'] = -1
      item.addEventListener('click', function () {
        // 点击时,其他sort归-1,解决页面跳转bug
        ;[].forEach.call(buts, item => { 
          item === this ? this['data-type'] *= -1 : item['data-type'] = -1
        })
        let KeyWord = this.getAttribute('data-sort')
        cardList.sort((a, b) => { 
          if (KeyWord == 'data-time') { 
            return a.getAttribute(KeyWord).localeCompare(b.getAttribute(KeyWord))*this['data-type']
          }
          return (a.getAttribute(KeyWord) - b.getAttribute(KeyWord))*this['data-type']
        })
        //利用DOM映射机制,实现响应式
        cardList.forEach(item => { 
          goods.appendChild(item)
        })
      })
    })
}()