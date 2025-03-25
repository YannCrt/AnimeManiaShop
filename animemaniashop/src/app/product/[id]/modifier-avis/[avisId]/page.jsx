"use client"; // Assurez-vous d'importer cette fonction client-side

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAvisbyId, updateAvis } from "../../../../../../lib/product.action";

export default function ModifierAvis() {
  const params = useParams();
  const router = useRouter();
  const { id, avisId } = params;

  const [avis, setAvis] = useState(null);
  const [note, setNote] = useState(1);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAvis() {
      try {
        if (!avisId) return;

        setLoading(true);
        const fetchedAvis = await getAvisbyId(avisId);

        if (!fetchedAvis) {
          setMessage("Avis non trouvé");
          return;
        }

        setAvis(fetchedAvis);
        setNote(fetchedAvis.note);
        setContent(fetchedAvis.content);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'avis:", error);
        setMessage("Erreur lors de la récupération de l'avis.");
      } finally {
        setLoading(false);
      }
    }

    fetchAvis();
  }, [avisId]);

  async function handleUpdateAvis(event) {
    event.preventDefault();
    try {
      await updateAvis(avisId, parseInt(note), content);
      setMessage("Avis modifié avec succès!");
      router.push(`/product/${id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avis:", error);
      setMessage("Erreur lors de la mise à jour de l'avis");
    }
  }

  if (loading) {
    return <div className="edit-review-loading">Chargement...</div>;
  }

  if (!avis) {
    return (
      <div className="edit-review-loading text-red-500">Avis non trouvé</div>
    );
  }

  return (
    <div className="edit-review-container">
      <h1 className="edit-review-title">Modifier votre avis</h1>

      {message && (
        <p
          className={`edit-review-message ${
            message.includes("succès") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleUpdateAvis} className="edit-review-form">
        <div className="form-group">
          <label htmlFor="note">Note :</label>
          <select
            id="note"
            value={note}
            onChange={(e) => setNote(parseInt(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Avis :</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="4"
            placeholder="Partagez votre expérience avec ce produit..."
          />
        </div>

        <button type="submit" className="edit-review-submit">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
