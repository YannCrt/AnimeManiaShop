import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../src/app/components/Footer";
import '@testing-library/jest-dom';


describe("Footer Component", () => {
  test("renders the footer correctly", () => {
    // Utilisation de React.createElement à la place de JSX
    render(React.createElement(Footer));
  
    // Vérifier que le titre 'Information' est présent
    expect(screen.getByText(/Information/i)).toBeInTheDocument();
  
    // Récupérer tous les éléments "Mentions légales"
    const mentionsLegales = screen.getAllByText(/Mentions légales/i);
    expect(mentionsLegales[0].closest('a')).toHaveAttribute('href', '/legal-notice'); // Vérifier le premier lien "Mentions légales"
  
    // Vérifier que les autres liens sont également présents
    expect(screen.getByText(/Politique de confidentialité/i).closest('a')).toHaveAttribute('href', '/privacy-policy');
    expect(screen.getByText(/Conditions générales d'utilisation/i).closest('a')).toHaveAttribute('href', '/terms-of-service');
  
    // Vérifier la section 'Contact'
    expect(screen.getByText(/Santiago Naranjo Henao Grajales Ladino/i)).toBeInTheDocument();
    expect(screen.getByText(/contact@animemaniashop.com/i).closest('a')).toHaveAttribute('href', 'mailto:contact@animemaniashop.com');
    expect(screen.getByText(/\+33 6 56 80 29 29/i).closest('a')).toHaveAttribute('href', 'tel:+33656802929');
  
    // Vérifier la section de copyright
    expect(screen.getByText(/Copyright © 2025 Anime Mania Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Conditions générales de ventes/i).closest('a')).toHaveAttribute('href', '/terms-of-sale');
  });
  
});
