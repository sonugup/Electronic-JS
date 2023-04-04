const btn=document.getElementById("btn");


btn.addEventListener("click", () => {
    html2canvas(document.body)
    .then(canvas => {
        const url=canvas.toDataURL('image/png');
        const a=document.createElement('a');
        a.setAttribute('download', `imageName.png${Math.floor(Math.random()*10)}`);
        a.setAttribute('href', url);
            setInterval(() => {
                a.click();
            }, 10000);                        
    });
});


