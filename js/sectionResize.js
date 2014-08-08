function sectionResize()
{
    var secDim=document.getElementById('sectionResize');
    secDim.style.height=(parseInt(secDim.style.width)/2)+'px';
    alert("Changed");
}
window.addEventListener('resize',sectionResize);
window.addEventListener('load',sectionResize);
sectionResize();