export default {
    template: `
      <div draggable="true" v-on:dragstart="onDragStart">Drag Me!</div>
    `,
    data: function () {
        return {};
    },
    methods: {
        onDragStart(event) {
            var userAgent = window.navigator.userAgent;
            var isIE = userAgent.indexOf('Trident/') >= 0;
            event.dataTransfer.setData(isIE ? 'text' : 'text/plain', 'Dragged item with ID: ' + this.params.node.data.id);
        }
    }
};
