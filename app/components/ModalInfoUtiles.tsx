"use client";
import { useSnapshot } from "valtio";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "@nextui-org/react";
import { card } from "../utils/products";
import useCard from "../hooks/useCard";
//import store from "@/app/components/store"; address selcted id

const ModalInfoUtiles = ({ showModal, setShowModal }: any) => {
const [selectedVille, setSelectedVille] = useState(1);
const handleVilleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVille(parseInt(event.target.value)); // Mettre à jour l'état avec la nouvelle valeur sélectionnée
};
const { selectedShoplist } = useCard();

const toggleModal = () => {
    setShowModal(!showModal);
};
const [activeTab, setActiveTab] = useState("general");

const handleTabChange = (tab: string) => {
    setActiveTab(tab);
};

const renderTabContent = () => {
    if (activeTab === "general") {
    return (
        <div className="tab-content active">
            <div >
            <div style={{ display: "flex" }}>
                <img
                src="https://www.commande-pizzatime.fr/CESARWEB_WEB/address_icon.svg"
                className="mr-2"
                alt="ADRESSE"
                />{" "}
                &nbsp;&nbsp;&nbsp;
                <div className="text-capitalize">
                <p>
                    {selectedShoplist.Address}, {selectedShoplist.PostalCode} {selectedShoplist.town}
                </p>
                </div>
            </div>
            </div>
        <br />
        <br />
            <div >
            <div style={{ display: "flex" }}>
                <img
                src="https://www.commande-pizzatime.fr/CESARWEB_WEB/phone_icon.svg"
                className="mr-2"
                alt="ADRESSE"
                />{" "}
                &nbsp;&nbsp;&nbsp;
                <p>{selectedShoplist.tel}</p>
            </div>
            </div>
        <div className="text-capitalize">
            <div style={{ display: "flex" }}>
            <img
                src="https://www.commande-pizzatime.fr/CESARWEB_WEB/mdv_icon.svg"
                className="mr-2"
                alt="ADRESSE"
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Button className="mr-2">À emporter</Button> &nbsp;&nbsp;&nbsp;
            <Button>En livraison</Button>
            </div>
        </div>
        <br />
        <br />

        <div className="text-capitalize">
            <div style={{ display: "flex" }}>
            <img
                src="https://www.commande-pizzatime.fr/CESARWEB_WEB/wallet_icon.svg"
                className="mr-2"
                alt="ADRESSE"
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Button className="mr-2">Espèce</Button> &nbsp;&nbsp;&nbsp;
            <Button className="mr-2">Carte bancaire</Button>{" "}
            &nbsp;&nbsp;&nbsp;
            <Button>Ticket restaurant</Button>
            </div>
        </div>
        </div>
    );
    } else if (activeTab === "horaires") {
    return (
        <div className="tab-content active">
            <div >
            <p>
                <img
                src="https://www.commande-pizzatime.fr/CESARWEB_WEB/ext/click.svg"
                alt="icone_horaires"
                style={{ height: "30px" }}
                className="mr-2"
                />{" "}
                Horaires d'ouverture :
            </p>

            <ul>
                <li>LUNDI : xxxxx</li>
                <br />
                {/* <li>MARDI : {item.horaire.mardi}</li>
            <br />
            <li>MERCREDI : {item.horaire.mercredi}</li>
            <br />
            <li>JEUDI : {item.horaire.jeudi}</li>
            <br />
            <li>VENDREDI : {item.horaire.vendredi}</li>
            <br />
            <li>SAMEDI : {item.horaire.samedi}</li>
            <br />
            <li>DIMANCHE : {item.horaire.dimanche}</li>
            <br /> */}
            </ul>
            </div>
        </div>
    );
    } else if (activeTab === "livraison") {
    return (
        <div
        className="tab-pane fade active show"
        id="third"
        role="tabpanel"
        aria-labelledby="third-tab"
        >
            <div >
            <div className="col-12 d-flex justify-content align-items-center">
                <select
                id="selectville"
                className="w-100 form-select form-select-lg mb-3 text-center zone_recherche_btq"
                style={{
                    fontSize: "17px",
                    border: "1px solid #eaeaea",
                    height: "40px",
                }}
                >
                <option selected value="1">
                    {selectedShoplist.villelivraison.ville1.nom}
                </option>
                <option value="2">{selectedShoplist.villelivraison.ville2.nom}</option>
                <option value="3">{selectedShoplist.villelivraison.ville3.nom}</option>
                <option value="4">{selectedShoplist.villelivraison.ville4.nom}</option>
                <option value="5">{selectedShoplist.villelivraison.ville5.nom}</option>
                <option value="6">{selectedShoplist.villelivraison.ville6.nom}</option>
                <option value="7">{selectedShoplist.villelivraison.ville7.nom}</option>
                <option value="8">{selectedShoplist.villelivraison.ville8.nom}</option>
                </select>
            </div>
            <p>
                Frais de livraison : {selectedShoplist.villelivraison.ville1.fraislivraison}
            </p>
            <p>
                Minimum de commande :{selectedShoplist.villelivraison.ville1.mincommande}{" "}
            </p>
            </div>
        </div>
    );
    }
};

return (
    <div >
    <Modal isOpen={showModal} toggle={toggleModal} >
        <ModalHeader toggle={toggleModal}>Informations utiles</ModalHeader>
        <ModalBody>
        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
            <button
                className={`nav-link ${
                activeTab === "general" ? "active" : ""
                }`}
                onClick={() => handleTabChange("general")}
            >
                Générales
            </button>
            </li>
            <li className="nav-item">
            <button
                className={`nav-link ${
                activeTab === "horaires" ? "active" : ""
                }`}
                onClick={() => handleTabChange("horaires")}
            >
                Horaires
            </button>
            </li>
            <li className="nav-item">
            <button
                className={`nav-link ${
                activeTab === "livraison" ? "active" : ""
                }`}
                onClick={() => handleTabChange("livraison")}
            >
                Livraison
            </button>
            </li>
        </ul>
        <div className="tab-content">{renderTabContent()}</div>
        </ModalBody>
    </Modal>
    </div>
);
};

export default ModalInfoUtiles;
