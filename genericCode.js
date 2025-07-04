var genericCode = {

    //  Get form context safely
    getFormContext: function (executionContext) {
        return executionContext.getFormContext();
    },

    //  Get value (auto handle type)
    getValue: function (executionContext, fieldName) {
        var formContext = genericCode.getFormContext(executionContext);
        var attr = formContext.getAttribute(fieldName);
        if (!attr) return null;

        var type = attr.getAttributeType();

        switch (type) {
            case "lookup":
                return attr.getValue()?.[0] || null;
            case "datetime":
            case "date":
                return attr.getValue() || null;
            case "boolean":
                return attr.getValue() === true;
            case "optionset":
                return attr.getValue();
            case "string":
            case "memo":
            case "integer":
            case "decimal":
            case "double":
            case "money":
                return attr.getValue();
            default:
                return attr.getValue();
        }
    },

    //  Set value (auto handle type)
    setValue: function (executionContext, fieldName, value) {
        var formContext = genericCode.getFormContext(executionContext);
        var attr = formContext.getAttribute(fieldName);
        if (!attr) return;

        if (attr.getAttributeType() === "lookup" && value) {
            attr.setValue([{
                id: value.id,
                name: value.name,
                entityType: value.entityType
            }]);
        } else {
            attr.setValue(value);
        }
        attr.setSubmitMode("always");
    },

    //  Set field visibility (generic)
    setFieldVisibility: function (executionContext, fieldName, isVisible) {
        var control = genericCode.getFormContext(executionContext).getControl(fieldName);
        if (control) control.setVisible(isVisible);
    },

    //  Disable/Enable field
    setFieldDisabled: function (executionContext, fieldName, isDisabled) {
        var control = genericCode.getFormContext(executionContext).getControl(fieldName);
        if (control) control.setDisabled(isDisabled);
    },

    //  Set required level
    setRequiredLevel: function (executionContext, fieldName, level) {
        var attr = genericCode.getFormContext(executionContext).getAttribute(fieldName);
        if (attr) attr.setRequiredLevel(level); // "none", "required", "recommended"
    },

    //  Show form notification
    showFormNotification: function (executionContext, message, level = "INFO", id = "formNotif") {
        genericCode.getFormContext(executionContext).ui.setFormNotification(message, level, id);
    },

    clearFormNotification: function (executionContext, id = "formNotif") {
        genericCode.getFormContext(executionContext).ui.clearFormNotification(id);
    },

    //  Show field-level notification
    showFieldNotification: function (executionContext, fieldName, message, id = "fieldNotif") {
        genericCode.getFormContext(executionContext).getControl(fieldName)?.setNotification(message, id);
    },

    clearFieldNotification: function (executionContext, fieldName, id = "fieldNotif") {
        genericCode.getFormContext(executionContext).getControl(fieldName)?.clearNotification(id);
    },

    //  Prevent form save with alert
    preventSave: function (executionContext, message) {
        let args = executionContext.getEventArgs();
        args.preventDefault();
        alert(message);
    },

    //  Format date yyyy-MM-dd
    formatDate: function (date) {
        return date?.toISOString()?.split("T")[0] ?? null;
    },

    //  Get current user info
    getCurrentUser: function () {
        let userSettings = Xrm.Utility.getGlobalContext().userSettings;
        return {
            id: userSettings.userId,
            name: userSettings.userName
        };
    },

    //  Set field to current user
    setCurrentUserToLookup: function (executionContext, fieldName) {
        var formContext = genericCode.getFormContext(executionContext);
        var user = genericCode.getCurrentUser();
        formContext.getAttribute(fieldName).setValue([{
            id: user.id,
            name: user.name,
            entityType: "systemuser"
        }]);
    }
};
