sap.ui.define([], function() {
    "use strict";

    return {
        formatTitle: function(tcType) {
            return tcType === 'Project' ? 'Project Title' : 'Other Title';
        }
    };
});
