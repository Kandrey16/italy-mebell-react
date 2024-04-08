import { makeAutoObservable, runInAction, action } from "mobx";
import { createAttributeGroup, createAttribute, updateAttribute, updateAttributeGroup, deleteAttribute, deleteAttributeGroup, fetchAttributeGroups, fetchAttributes } from "@/API/AttributeAPI";

export default class AttributeStore {
    constructor() {
        this._attributes = [

        ]
        this._attributeGroups = [

        ]
        this._selectedAttributeGroup = {}
        makeAutoObservable(this)
    }

    setAttributes(attributes) {
        this._attributes = attributes
    }
    setAttributeGroups(attributeGroups) {
        this._attributeGroups = attributeGroups
    }
    setSelectedAttributeGroup(group) {
        runInAction(() => {
            this._selectedAttributeGroup = group
        })
    }


    get attributes() {
        return this._attributes
    }
    get attributeGroups() {
        return this._attributeGroups
    }
    get selectedAttributeGroup() {
        return this._selectedAttributeGroup
    }


    createAttribute = async (newAttribute) => {
        try {
            const data = await createAttribute(newAttribute);
            runInAction(() => {
                this._attributes.push(data);
            });
        } catch (error) {
            console.error('Ошибка при создании атрибутов:', error);
        }
    };

    editAttribute = async (id, editedAttribute) => {
        try {
          const data = await updateAttribute(id, editedAttribute);
          runInAction(() => {
            // Обновляем только атрибут с соответствующим id
            this._attributes = this._attributes.map((attribute) =>
              attribute.id_attribute === id ? data : attribute
            );
          });
        } catch (error) {
          console.error('Ошибка при редактировании атрибута:', error);
        }
      };

    deleteAttribute = async (id) => {
        await deleteAttribute(id);
        action(() => {
            this._attributes = this._attributes.filter(attribute => attribute.id_attribute !== id);
        })();
    };

    fetchAttributes = async () => {
        try {
            const attributes = await fetchAttributes();
            runInAction(() => {
                this.setAttributes(attributes);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка атрибутов:', error);
        } 
    };

    createAttributeGroup = async (newAttributeGroup) => {
        try {
            const data = await createAttributeGroup(newAttributeGroup);
            runInAction(() => {
                this._attributeGroups.push(data);
                this.fetchAttributeGroups();
            });
        } catch (error) {
            console.error('Ошибка при создании группы атрибутов:', error);
        }
    };

    editAttributeGroup = async (id, editedAttributeGroup) => {
        const data = await updateAttributeGroup(id, editedAttributeGroup);
        this._attributeGroups = this._attributeGroups.map(attributeGroup => attributeGroup.id_attribute_group === id ? data : attributeGroup);
    };

    deleteAttributeGroup = async (id) => {
        await deleteAttributeGroup(id);
        action(() => {
            this._attributeGroups  = this._attributeGroups.filter(attributeGroup => attributeGroup.id_attribute_group !== id);
        })();
    };

    fetchAttributeGroups = async () => {
        try {
          const attributeGroups = await fetchAttributeGroups();
          runInAction(() => {
            this.setAttributeGroups(attributeGroups);
            console.log("Группы атрибутов получены: ", this._attributeGroups); // Добавляем console.log сюда
          });
        } catch (error) {
          console.error('Ошибка при обновлении списка групп атрибутов:', error);
        } 
      };
}