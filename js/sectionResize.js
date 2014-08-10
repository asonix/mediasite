function sectionResize () {
    var section = document.getElementsByTagName ('section')[0];
    section.style.height = section.clientWidth * .45 + 'px';
}
window.onresize = function () {
    sectionResize ();
}
window.onload = function () {
    sectionResize ();
}
sectionResize ();