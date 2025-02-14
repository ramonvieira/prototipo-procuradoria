Diretiva que facilita o uso do ui-select2 do BFC.

## Modo de usar:

### ui-select-enum
```html
<ui-select-enum
    ng-model="vm.lotacao.agenteNocivo"
    options="vm.agentesNocivos"
    allow-clear="false"
    format-selection="vm.formartSelect(data)"
    format-result="vm.formartSelect(data)">
</ui-select-enum>
```

Promise com o mapa de enums, similar ao enum Java com a adição da propriedade id( que deve ter o mesmo valor da key).
```js
 {
    A1: { id:'A1', key:'A1', description: 'Descrição A1'},
    A2: { id:'A2', key:'A2', description: 'Descrição A2'},
    values: [/* Arrays com os objetos anteriores */]
}
```

```js
vm.agentesNocivos = lotacaoService.getAgentesNocivos();
```

### ui-select-boolean
```html
<ui-select-boolean
    ng-model="vm.vinculoEmpregaticio.vinculoTemporario"
    true-description="Sim"
    false-description="Não">
</ui-select-boolean>
```

### ui-select
```html
<ui-select ng-model="vm.model" search="vm.searchMotivoRescisao" add-value="vm.addMotivoRescisao" ng-change="vm.changeValue()"/>
```

```js
var vm = this;

vm.searchMotivoRescisao = searchMotivoRescisao;
vm.addMotivoRescisao = addMotivoRescisao;
vm.changeValue = changeValue;

function searchMotivoRescisao(params) {
    return motivorescisaoService.listAll(params.offset, params.limit,
        '(descricao like "' + params.term + '")');
}

function addMotivoRescisao(descricao) {
    return dialog.open({
        templateUrl: 'motivo-rescisao/motivo-rescisao-modal.html',
        controller: 'app.motivoRescisao.MotivoRescisaoModalController as vm',
        resolve: {
            params: {
                motivoRescisao: {descricao: descricao}
            }
        }
    });
}

function changeValue(newValue,oldValue){
    console.log(newValue);
    console.log(oldValue);
}
```

## Parâmetros

 * ```id``` - Valor do atributo id no elemento ```<input>``` do componente.
 * ```ng-model``` - (obrigatório) Model para o valor selecionado no componente.
 * ```ng-disabled``` - Condição para desabilitar o componente
 * ```ng-change``` - Callback que e chamada sempre que valor do componente sofre uma alteração. 
 * ```ngclass``` - Classes CSS que devem ser aplicadas no componente.
 * ```description-field``` - Nome do campo que o componene deve utilizar como descrição para listagem dos resultados.
 * ```allow-clear``` -  Permite que o valor selecionado seja removido (não tem efeito quando a opção ```multiple``` é utilizada).
 * ```multiple``` - Permite a seleção de múltiplos valores.
 * ```add-value``` - Possibilita o cadastro de novos valores através do componente. Deve ser passado o nome de uma função que recebe como parâmetro a string digitada pelo usuário. Exemplo: ```<ui-select add-value="cadastraItem">```. 
 * ```search``` - Função chamada para listar resultados na busca do componente. Recebe um parâmetro que é um objeto com os seguintes atributos:
     - ```term```: o termo digitado no componente
     - ```offset```: índice do primeiro item que deve ser retornado na busca
     - ```limit```: número de itens que devem ser retornados na busca 
 * ```format-selection``` - Função utilizada para formatar o item selecionado no componente.
 * ```format-result``` - Função utilizada para formatar os resultados da busca
 * ```minimum-input-length``` - Número mínimo de caracteres que devem ser digitados para que o componente comece a buscar resultados.
 * ```maximum-input-length``` - Número máximo de caracteres que devem ser digitados no campo para a busca.
 * ```placeholder``` - Texto que deve ser exibido quando o componente não possui um valor selecionado.
 * ```dropdown-css-class``` - Classe CSS que deve ser aplicada ao dropdown com os resultados da busca.
 * ```dropdown-auto-width``` - Ajusta automaticamente a largura do dropdown com os resultados para a mesma largura do componente.
 * ```debounce-delay``` - Delay em milisegundos antes de disparar uma busca.