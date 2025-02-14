Componente do tipo spinner para o angular, suporta somente valores inteiros.

## Modo de usar:

```html
<ui-spinner ng-model="vm.model.numero" ui-min="0" ui-max="99" step="1"></ui-spinner>
```

## Parametros:

### ng-model
Variavel para o binding

### ng-disabled
Estado do componente, se true o componente ficará desabilitado

### step
Valor a ser incrementado quando o usuário clica nos botões, ou pressiona as teclas para cima/baixo

### placeholder
Adiciona placeholder ao campo