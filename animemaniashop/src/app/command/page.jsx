"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function CommandPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.address.trim()) newErrors.address = "Adresse requise";
    if (!formData.city.trim()) newErrors.city = "Ville requise";
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Code postal requis";
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Code postal invalide";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Numéro de téléphone requis";
    } else if (
      !/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Numéro de téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Fetch cart items to send with the order
      const cartResponse = await fetch("/api/cart");
      const cartData = await cartResponse.json();

      // Submit order
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items: cartData.cartItems,
          total: cartData.cartItems.reduce(
            (acc, item) => acc + item.product.price * item.quantitee,
            0
          ),
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Erreur lors de la validation de la commande");
      }

      // Clear cart after successful order
      await fetch("/api/cart/clear", { method: "DELETE" });

      // Redirect to confirmation page
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de la validation de la commande");
    }
  };

  return (
    <div className="command-page container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Finalisation de la commande</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-2">
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2">
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="block mb-2">
            Adresse
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.address ? "border-red-500" : ""
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="city" className="block mb-2">
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label htmlFor="postalCode" className="block mb-2">
              Code Postal
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.postalCode ? "border-red-500" : ""
              }`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="phoneNumber" className="block mb-2">
            Numéro de Téléphone
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Valider la commande
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommandPage;
