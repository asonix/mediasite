function sectionResize () {
    
    var header = document.getElementsByTagName ('header')[0];
    var footer = document.getElementsByTagName('footer')[0];
    var section = document.getElementsByTagName ('section')[0];
    
    var availableHeight = window.innerHeight - header.clientHeight - footer.clientHeight;
    
    var proposedHeight = section.clientWidth * .45;
    var proposedWidth = availableHeight / .45;
    
    if (proposedHeight > availableHeight) {
        section.style.height = availableHeight + 'px';
        section.style.width  = availableHeight / .45 + 'px';
        section.style.marginLeft = 'auto';
    }
    else if (proposedHeight < availableHeight) {
        section.style.width  = proposedWidth + 'px';
        section.style.height = section.clientWidth * .45 + 'px';
        section.style.marginLeft = -(section.clientWidth - window.innerWidth + getScrollbarWidth ()) / 2 + 'px';
    }
    else {
        section.style.height = proposedHeight + 'px';
        section.style.marginLeft = 'auto';
    }
}

function getScrollbarWidth () {
    var outer = document.createElement ("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild (outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement ("div");
    inner.style.width = "100%";
    outer.appendChild (inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild (outer);

    return widthNoScroll - widthWithScroll;
}