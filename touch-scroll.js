let isClicked = false;
let prevCursorPos = 0;
let delayMouseBtn;

const TOUCH_SCROLL_CLASSNAME = 'touch-scroll';
const TOUCH_SCROLL_NO_SCROLLBAR_CLASSNAME = 'touch-scroll--no-scrollbar';

createTouchScroll(document.querySelector('.slider-container'));

function createTouchScroll(scrollContainer) {
  scrollContainer.classList.add(TOUCH_SCROLL_CLASSNAME);
  scrollContainer.classList.add(TOUCH_SCROLL_NO_SCROLLBAR_CLASSNAME);
  scrollContainer.addEventListener('mousedown', createMouseSwipe);
  scrollContainer.addEventListener('mouseup', createMouseSwipe);
  scrollContainer.addEventListener('mouseleave', createMouseSwipe);
  scrollContainer.addEventListener('mousemove', createMouseSwipe);
  scrollContainer.addEventListener('click', clickPropagationHandler);
}

function createMouseSwipe(event) {
  const elem = event.currentTarget;

  switch (event.type) {
    case 'mousedown':
      isClicked = true;
      prevCursorPos = getCursorPos(event, elem);
      delayMouseBtn = event.timeStamp;
      break;
    case 'mouseleave':
    case 'mouseup':
      isClicked = false;
      delayMouseBtn = event.timeStamp - delayMouseBtn;
      break;
    case 'mousemove':
      if (isClicked) {
        const currentPos = getCursorPos(event, elem);

        scrollElemByDelta(elem, getDeltaFromPrevPos(currentPos));
        prevCursorPos = currentPos;
      }

      break;
  }
}

function isHorizontal(element) {
  return element.scrollWidth > element.scrollHeight;
}

function getCursorPos(event, element) {
  return isHorizontal(element) ? event.clientX : event.clientY;
}

function getDeltaFromPrevPos(nextPos) {
  return nextPos - prevCursorPos;
}

function scrollElemByDelta(element, delta) {
  isHorizontal(element) ? element.scrollLeft -= delta : element.scrollTop -= delta;
}

function clickPropagationHandler(event) {
  if (delayMouseBtn >= 100) {
    event.stopPropagation();
    event.preventDefault();
  }
}
