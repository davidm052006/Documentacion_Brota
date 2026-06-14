function normalizarPerfilVocacional(perfilVocacional = {}) {
  if (
    perfilVocacional &&
    typeof perfilVocacional === 'object' &&
    perfilVocacional.perfil &&
    typeof perfilVocacional.perfil === 'object'
  ) {
    return perfilVocacional.perfil;
  }

  return perfilVocacional;
}

function calcularPorcentajes(perfil = {}) {
  const perfilNormalizado = normalizarPerfilVocacional(perfil);

  if (!perfilNormalizado || Object.keys(perfilNormalizado).length === 0) {
    return {};
  }

  const total = Object.values(perfilNormalizado)
    .reduce((sum, value) => sum + Number(value || 0), 0);

  if (total <= 0) {
    return Object.fromEntries(
      Object.keys(perfilNormalizado).map(area => [area, 0])
    );
  }

  const porcentajes = {};

  for (const [area, valor] of Object.entries(perfilNormalizado)) {
    porcentajes[area] =
      (Number(valor || 0) / total) * 100;
  }

  return porcentajes;
}

module.exports = {
  calcularPorcentajes
};