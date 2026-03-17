/**
 * Formata uma string de data para o padrão brasileiro (pt-BR)
 */
export const formatDateBR = (dateString: string): string => {
  if (!dateString) return "";
  // A data da NASA vem no formato YYYY-MM-DD
  // Adicionamos o horário T12:00:00 para evitar problemas de fuso horário que podem mudar o dia
  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat("pt-BR").format(date);
};

/**
 * Formata uma string de data para o padrão brasileiro por extenso
 * Exemplo: terça-feira, 17 de março de 2026
 */
export const formatDateFullBR = (dateString: string): string => {
  if (!dateString) return "";
  
  const date = new Date(`${dateString}T12:00:00`);
  
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
