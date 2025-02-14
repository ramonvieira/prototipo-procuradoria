# PrintService
Serviço para imprimir uma parte do DOM

Exemplo:
```javascript
Controller.$inject = ['PrintService'];
function Controller(PrintService){
    PrintService.print('.seletor');
    
    var node = $('img').children().find('todoMundoQueEuQueroPorNaImpressão');
    PrintService.print(node);
}
```