# ui.components.Modal

Serviço para abertura de modais.

# Modo de usar
Através do método ```open(options)``` fazer configurar a modal.
```javascript
Controller.$inject = ['ui.compoents.Modal'];
function Controller(uiModal){
    uiModal.open({
        template:'É hora do show',
        controller:'TrapezioDescendenteController',
        params:{ ehTreze: 'Treze memo' }
    });
}
```
# Método ```open(options)```
Único método disponibilizado pelo serviço para abertura da modal.
Aceita um ```Object``` com as opções.
Retorna a instância da modal.

## Options
Propriedade | Descrição
--- | ---
**template** | ```string``` com o html que é o conteúdo da modal.
**templateUrl** | url com o caminho para um arquivo html que será carregado e usado como conteúdo da modal
**size** | sufixo da classe que define o tamanho da modal. Exemplo: passando o valor ```'lg'``` o estilo que define o tamanho da modal será ```'modal-lg'```
**controller** | ```string``` com nome do controller desta modal. Aceita alias para o controller.
**controllerAs** | ```string``` com o alias do controller.
**params** | Objeto que define os parâmetros disponíveis para a instância da modal. Resolve functions e promises antes da abertura da modal. Os valores aqui passados estão disponíveis em $modalInstance.params
**scope** | $scope pai do $scope da modal.
**autoFocus** | Define se, ao abrir a modal, o foco deve estar no primeiro campo. Padrão ```true```.
**focusOnClose** | x.x
**styleClass** | x.x

## Modal instance
Objecto que representa a instancia do modal. Fica disponível tanto para quem invocar o método ```open``` quanto como para o controller.

Propriedade | Descrição
--- | ---
**result** | Promise que representa a o resultado da ação da modal. Promise resolvida quando o método close é chamado (com o valor passado) e rejeitada quando o modal é dispensado.
**tracker**  | PromiseTracker da modal, colando o loading em toda ela.
**dismiss** | Método para dispensar a modal, rejeitando a promise result.
**close** | Método para fechar a modal, resolvendo a promise result.

## Modal Scope
O scope da modal conta com os métodos:

Propriedade | Descrição
--- | ---
**$close** | Fecha a modal
**$dismiss** | Dispensa a modal

## Locals
Propriedades que podem ser injetadas no controller da modal.

Propriedade | Descrição
--- | ---
**$modalInstance** | Objecto que representa a modal, com os métodos e propriedades descritos nos itens anteriores
**$modalTracker** | Tracker da modal.

# Exemplos
```TODO:```