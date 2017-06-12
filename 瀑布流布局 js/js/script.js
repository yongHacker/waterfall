window.onload=function(){
    waterfall("main","box");
    var dataInt={"data":[{"src":'20.jpg'},{"src":'21.jpg'},{"src":'22.jpg'},{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},{"src":'27.jpg'},{"src":'28.jpg'},{"src":'29.jpg'},{"src":'30.jpg'},{"src":'31.jpg'},{"src":'32.jpg'},{"src":'33.jpg'},{"src":'34.jpg'},{"src":'35.jpg'},{"src":'36.jpg'},{"src":'37.jpg'},{"src":'38.jpg'},{"src":'39.jpg'},{"src":'40.jpg'},{"src":'41.jpg'},{"src":'42.jpg'},{"src":'43.jpg'},{"src":'44.jpg'},{"src":'45.jpg'},{"src":'46.jpg'},{"src":'47.jpg'},{"src":'48.jpg'},{"src":'49.jpg'},{"src":'50.jpg'}]}
    window.onscroll=function(){
       if(checkScrollSlide()){
        var oParent=document.getElementById("main");
            //将数据块渲染到页面底部
            for(var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement("div");
                oBox.className="box";
                oParent.appendChild(oBox);
                var oPic=document.createElement("div");
                oPic.className="pic";
                oBox.appendChild(oPic);
                var oImg=document.createElement("img");
                oImg.src="images/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall("main","box");
        }

    }
}

function waterfall(parent,box){
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);
    /* console.log(oBoxs.length);*/
    var oBoxW=oBoxs[0].offsetWidth;
    /* console.log(oBoxW);*/
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);//document.documentElement.clientWidth是当前可视区域的宽，不包括边线
    /* console.log(cols);*/
    //设置main的宽
    oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto";
    var hArr=[];//存放每一列高度的数组
    for(var i=0;i<oBoxs.length;i++){
        if (i<cols) {
            hArr.push(oBoxs[i].offsetHeight);
        }
        else{
            var minH=Math.min.apply(null,hArr);
            /*console.log(minH);*/
            var index=getMinhIndex(hArr,minH);
            oBoxs[i].style.position="absolute";
            oBoxs[i].style.top=minH+"px";
            /*2种方法得left值*/
           // oBoxs[i].style.left=oBoxW*index+"px";
            oBoxs[i].style.left=oBoxs[index].offsetLeft+"px";
            hArr[index]=minH+oBoxs[i].offsetHeight;
        }
    }
    console.log(hArr);
}

function getByClass(parent,clsName){
    var boxArr=new Array();
    var oElements=parent.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

 function getMinhIndex(arr,value){
    for(var i in arr){//遍历数组
        if(arr[i]==value){
            return i;
        }
    }
}

//检测是否具备滚动条加载数据块的条件
function checkScrollSlide(){
    var oParent=document.getElementById("main");
    var oBoxs=document.getElementsByClassName("box");
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    //混杂模式||标准模式
    //滚动的像素距离
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
     /*console.log(scrollTop);*/
    //浏览器可视区域像素高度
    var height=document.body.clientHeight||document.documentElement.clientHeight;
     /*console.log(height);*/
    return (lastBoxH<scrollTop+height)?true:false;
 } 


