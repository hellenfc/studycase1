sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast'
], function (jQuery, Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.Form", {
        onInit: function() {
            var jsonData = {
                "places": [{
                        "id": 0,
                        "country": "United States",
                        "states": [{
                                "id": 0,
                                "name": "Kentucky"
                            },
                            {
                                "id": 1,
                                "name": "Abc"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "country": "Brasil",
                        "states": [{
                                "id": 0,
                                "name": "Acre"
                            },
                            {
                                "id": 1,
                                "name": "Abc"
                            }
                        ]
                    }
                ],
                "accountP": 0,
                "portfolioP": 0,
                "totalP": 0,
                "stateF": false,
                "countryF": false,
                "productF": false,
                "typeSelected": 0,
                "classSelected": 0,
                "productSelected": 0,
                "typeSelectedText": "",
                "classSelectedText": "",
                "productSelectedText": "",
                "table": [],
                "portfolio": [{
                        "id": 0,
                        "name": "Fuel",
                        "items": [{
                                "id": 0,
                                "name": "Gasoline",
                                "items": [{
                                        "id": 0,
                                        "name": "Regular"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Premium"
                                    }
                                ]
                            },
                            {
                                "id": 1,
                                "name": "Diesel",
                                "items": [{
                                    "id": 0,
                                    "name": "Diesel"
                                }]
                            },
                            {
                                "id": 2,
                                "name": "Gas",
                                "items": [{
                                        "id": 0,
                                        "name": "Ethanol"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Mixed Diesel"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "Products",
                        "items": [{
                                "id": 0,
                                "name": "Building Material",
                                "items": [{
                                    "id": 0,
                                    "name": "test"
                                }]
                            },
                            {
                                "id": 1,
                                "name": "Heavy Machinery",
                                "items": [{
                                    "id": 0,
                                    "name": "Anemometer"
                                }]
                            },
                            {
                                "id": 2,
                                "name": "Measurement Tools",
                                "items": [{
                                        "id": 0,
                                        "name": "Anemometer"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Barometer"
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "name": "Pesticides",
                                "items": [{
                                    "id": 0,
                                    "name": "test"
                                }]
                            },
                            {
                                "id": 4,
                                "name": "Replacement Part",
                                "items": [{
                                    "id": 0,
                                    "name": "test"
                                }]
                            },

                        ]
                    },
                    {
                        "id": 2,
                        "name": "Services",
                        "items": [{
                                "id": 0,
                                "name": "Transportation",
                                "items": [{
                                        "id": 0,
                                        "name": "Seed transportation"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Material transportation"
                                    }
                                ]
                            },
                            {
                                "id": 1,
                                "name": "Analysis/Consultancy",
                                "items": [{
                                        "id": 0,
                                        "name": "Soil Analysis"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Seed Quality Test"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            var oModelData = new JSONModel(jsonData);
            this.getView().setModel(oModelData);
        },

        onChange: function(event) {
            // console.log("Este es el evento", event);
            this.getView().byId("state").removeAllItems();
            var selectedCountry = event.mParameters.selectedItem.mProperties.key;
            var statesBox = this.getView().byId("state");
            this.getView().byId("state").setEnabled(true);
            statesBox.bindAggregation("items", "/places/" + selectedCountry + "/states", new sap.ui.core.Item({
                key: "{id}",
                text: "{name}"
            }));


            var model = this.getView().getModel();
            // console.log('Viene del modelo country', model.oData.countryF);
            var isSelected = model.oData.countryF;

            if (isSelected == false) {
                this.addPercentageSelect(event);
                model.setProperty("/countryF", true);
            }
        },

        //Add myData properties --not used--
        isSelected: function(event) {
            event.oSource.data("wasFull", true);
            var myData = event.oSource.getCustomData()[0];
            var wasFull = myData.mProperties.value;
            return wasFull;
        },

        // Radio buttons function, it changes the labels
        changeLabels: function(event) {
            var index = event.mParameters.selectedIndex;
            if (index == 0) {
                this.getView().byId("dateLabel").setText("Birth Date");
                this.getView().byId("nameLabel").setText("Full name");
            } else {
                this.getView().byId("dateLabel").setText("Founded");
                this.getView().byId("nameLabel").setText("Legal Name");
            }
        },

        addSelect: function(event) {
            var model = this.getView().getModel();
            // console.log('Viene del modelo state', model.oData.stateF);
            var isSelected = model.oData.stateF;

            if (isSelected == false) {
                this.addPercentageSelect(event);
                model.setProperty("/stateF", true);
            }
        },

        addPercentageInput: function(event) {
            var content = event.mParameters.value;
            // Verify if it contains something
            this.verifyContent(content);
        },

        addPercentageSelect: function(event) {
            var content = event.mParameters.selectedItem.mProperties.text;
            // Verify if it contains something

            this.verifyContent(content);
        },

        verifyContent: function(content) {
            var model = this.getView().getModel();
            var total = model.oData.totalP;
            var account = model.oData.accountP;
            // If it contains something add 25
            if (content) {
                account = account + 25;
                total = total + (25 / 2);
                model.setProperty("/accountP", account);
                model.setProperty("/totalP", total);
            } else {
                account = account - 25;
                model.setProperty("/accountP", account);
            }
            this.isFull();
        },

        // PORTFOLIO
        // Adds items to the second list
        firstListSelected: function(event) {
            this.getView().byId("thirdList").removeAllItems();
            var selectedType = event.mParameters.item.mProperties.key;
            var typeText = event.mParameters.item.mProperties.text;
            var secondList = this.getView().byId("secondList");
            secondList.bindAggregation("items", "/portfolio/" + selectedType + "/items", new sap.ui.core.Item({
                key: "{id}",
                text: "{name}"
            }));

            var model = this.getView().getModel();
            model.setProperty("/typeSelected", selectedType);
            model.setProperty("/typeSelectedText", typeText);

        },

        // Adds items to the third list
        secondListSelected: function(event) {
            var selectedClass = event.mParameters.item.mProperties.key;
            var classText = event.mParameters.item.mProperties.text;
            var thirdList = this.getView().byId("thirdList");
            var model = this.getView().getModel();
            var type = model.oData.typeSelected;
            thirdList.bindAggregation("items", "/portfolio/" + type + "/items/" + selectedClass + "/items", new sap.ui.core.Item({
                key: "{id}",
                text: "{name}"
            }));
            model.setProperty("/classSelected", selectedClass);
            model.setProperty("/classSelectedText", classText);
        },

        // Saves the selected item.
        thirdListSelected: function(event) {
            var productText = event.mParameters.item.mProperties.text;
            var model = this.getView().getModel();
            model.setProperty("/productSelectedText", productText);
        },

        addToTable: function(event) {
            var model = this.getView().getModel();
            var modelArray = model.oData.table;
            var typeSelect = model.oData.typeSelectedText;
            var classSelect = model.oData.classSelectedText;
            var productSelect = model.oData.productSelectedText;
            var total = model.oData.totalP;
            // Adding to the table
            for (var i = 0; i < modelArray.length + 1; i++) {
                var tableArray = {
                    "id": i,
                    "type": typeSelect,
                    "class": classSelect,
                    "product": productSelect
                };
            }
            modelArray.push(tableArray);
            model.setProperty("/table", modelArray);
            model.setProperty("/portfolioP", 100);
            //using a flag to check if totalP percentage was added
            var isSelected = model.oData.productF;

            // Adds 50% to the total percentage and updates the product flag
            if (isSelected == false) {
                model.setProperty("/totalP", total + 50);
                model.setProperty("/productF", true);
            }

            this.getView().byId("thirdList").removeAllItems();
            this.getView().byId("secondList").removeAllItems();

            this.isFull();
        },

        // It checks if total percentage bar is full
        isFull: function() {
            var model = this.getView().getModel();
            var total = model.oData.totalP;
            if (total === 100) {
                this.getView().byId("sendButton").setEnabled(true);

            }
        },

        // BUTTON
        // Shows a toast with all the Information
        showInfo: function(event) {
            var model = this.getView().getModel();
            var view = this.getView();
            var portfolio = model.oData.table;
            var registrationId = view.byId("registrationId").mProperties.value;
            var msg = "";
            var gettingPrefix = view.byId("prefix").getSelectedItem();
            var country = view.byId("country").getSelectedItem().getText();
            var date = view.byId("datepicker").getDateValue();
            var name = view.byId("name").mProperties.value;
            var state = view.byId("state").getSelectedItem().getText();
            var labelPerson = view.byId("dateLabel").getText();

            // console.log("diplay date", view.byId("datepicker").getDateValue());
            // console.log("diplay format", view.byId("datepicker").getDisplayFormat());
            // console.log("diplay format type", view.byId("datepicker").getDisplayFormatType());
            // console.log("value format", view.byId("datepicker").getValueFormat());
            // console.log(view.byId("prefix").getSelectedItem());
            var msg = 'Registration ID:' + registrationId + '\r\n';
            if (gettingPrefix != null) {
                var prefix = gettingPrefix.getText();
                msg = msg + 'Prefix:' + prefix + '\r\n';
            }
            msg = msg + 'Country:' + country + '\r\n';
            msg = msg + 'State:' + state + '\r\n';

            // Changes labels in toast if it's a person
            if (labelPerson === "Founded") {
                if (date != null) {

                    msg = msg + 'Founded:' + date + '\r\n';
                }
                msg = msg + 'Legal Name:' + name + '\r\n';
            } else {
                if (date != null) {
                    msg = msg + 'Birth Date:' + date + '\r\n';
                }
                msg = msg + 'Full Name:' + name + '\r\n';
            }
            msg = msg + 'Portfolio:' + '\r\n';

            // Adding the portfolio table
            for (var i = 0; i < portfolio.length; i++) {
                // console.log(portfolio[i]);
                msg = msg + "Type:" + portfolio[i].type + " | " + "Class:" + portfolio[i].class + " | " + portfolio[i].product + '\r\n';
            }

            MessageToast.show(msg, {
                width: "30em"
            });
        },

        isSaved: function() {
            var msg = 'Your Information is saved';
            MessageToast.show(msg);
        }
    });

});
