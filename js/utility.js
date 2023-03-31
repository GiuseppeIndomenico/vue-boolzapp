function createChild (tag, id, classes, text) {
    const element = document.createElement(tag);
    id && element.setAttribute('id', id);
    text && (element.textContent = text);
    classes && addClasses (element, classes);
    return element;
}

function addClasses (element, classes){
    for( let i = 0; i< classes.length; i++ ){
        element.classList.add(classes[i]);
    }
}

function removeClasses (element, classes){
    for( let i = 0; i< classes.length; i++ ){
        element.classList.remove(classes[i]);
    }
}

