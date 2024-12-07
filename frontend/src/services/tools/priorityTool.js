
// info... => Fonction qui calcul le nombre de jour restant entre deux dates données.
const calculatePriority = (startDate, endDate) => {
    if (!endDate) return 'basse'; // info... => Pas de date de fin = priorité basse

    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end - start;

    // info... => Définition des priorité
    if (difference <= 0) return 'forte'; 
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3) return 'forte';
    if (daysLeft <= 7) return 'moyenne'; 

    return 'basse'; 
};

export default calculatePriority;