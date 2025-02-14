# PrintService
Servi�o para imprimir uma parte do DOM

Exemplo:
```javascript
Controller.$inject = ['PrintService'];
function Controller(PrintService){
    PrintService.print('.seletor');
    
    var node = $('img').children().find('todoMundoQueEuQueroPorNaImpress�o');
    PrintService.print(node);
}
```