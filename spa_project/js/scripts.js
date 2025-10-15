
document.addEventListener('DOMContentLoaded',()=>{
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries,obs)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const img=e.target; img.src=img.dataset.src; img.classList.add('loaded'); img.removeAttribute('data-src'); obs.unobserve(img);
        }
      })
    },{rootMargin:'200px'});
    lazyImgs.forEach(i=>io.observe(i));
  } else { lazyImgs.forEach(i=>{i.src=i.dataset.src;i.classList.add('loaded')}); }

  function mask(input,fn){input.addEventListener('input',e=>{const v=input.value.replace(/\D/g,'');input.value=fn(v);});}
  const cpf=document.querySelectorAll('[data-mask="cpf"]'); cpf.forEach(i=>mask(i,v=>v.replace(/(\d{3})(\d{3})(\d{3})(\d{2}).*/,'$1.$2.$3-$4')));
  const tel=document.querySelectorAll('[data-mask="phone"]'); tel.forEach(i=>mask(i,v=>v.replace(/(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3')));
  const cep=document.querySelectorAll('[data-mask="cep"]'); cep.forEach(i=>mask(i,v=>v.replace(/(\d{5})(\d{3}).*/,'$1-$2')));

  document.querySelectorAll('form.needs-validation').forEach(form=>{
    form.addEventListener('submit',e=>{
      if(!form.checkValidity()){
        e.preventDefault(); e.stopPropagation(); form.classList.add('was-validated');
      }
    });
  });
});
