const body = document.body.classList;
/*
 * Styles and scripts shared  
 */
import "./shared/shared.module";

/*
 * If your page contains specific class in body, 
 * so load your module based in class 
 */
if (body.contains("home")) {
    import("./pages/home/home.module");
}  else if (body.contains("product")) {
    import("./pages/product/product.module");
}
    
 

