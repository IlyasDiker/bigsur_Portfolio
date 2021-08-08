const windowRoot = '#window-root-';
const windowHeader = '#window-header-';

setInterval(function(){
    let cTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    document.querySelector('#time').innerHTML = cTime;
 },200);

function closeFinderWindow(id) {  // id : Full elementId #window-root-[id]
    document.querySelector(id).classList.remove('opened');
    document.querySelector(id).classList.remove('focused');
}
function openFinderWindow(id) {  // id : Full elementId #window-root-[id]
    let elmnt = document.querySelector(id)
    elmnt.classList.add('opened');
    elmnt.style = '';
}
function maxFinderWindow(id) {  // id : Full elementId #window-root-[id]
    let elmnt = document.querySelector(id)
    if(elmnt.classList.contains('maximized')) {
        elmnt.classList.remove('maximized');
    } else {
        elmnt.classList.add('maximized');
    }
}

function dragElement(elmnt, windowHeader) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    windowHeader.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        let winbnd = document.querySelector('.windows').getBoundingClientRect();
        let elmbnd = elmnt.getBoundingClientRect();
        // console.log(winbnd);
        // console.log(elmbnd);
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        //(elmbnd.bottom < winbnd.bottom) && (elmbnd.top > winbnd.left) && (elmbnd.bottom > winbnd.left)
        if( elmbnd.right < winbnd.right){
            if(elmbnd.bottom < winbnd.bottom){
                if(elmbnd.top > winbnd.top){
                    if(elmbnd.left > winbnd.left){
                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    }else{
                        elmnt.style.left = (elmnt.offsetLeft + (2)) + "px";
                    }
                }else{
                    elmnt.style.top = (elmnt.offsetTop - (-2)) + "px";
                }
            }else{
                elmnt.style.top = (elmnt.offsetTop - (2)) + "px";
            }
        } else {
            elmnt.style.left = (elmnt.offsetLeft + (-2)) + "px";
        }
        
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.querySelectorAll('.finder').forEach(element => {
    let windowID = element.dataset.id;
    let elementId = element.id;
    let windowHeader = element.querySelector('.finder_title');
    dragElement(element, windowHeader);
    
    element.addEventListener('click', ()=>{
        document.querySelectorAll('.focused').forEach(el => {
            el.classList.remove('focused');
        });
        element.classList.add('focused');
    });
    
    element.querySelector('.finder_close').addEventListener('click', ()=>{
        closeFinderWindow('#'+elementId);
    });
    // element.querySelector('.finder_max').addEventListener('click', ()=>{
    //     maxFinderWindow('#'+elementId);
    // });
});
