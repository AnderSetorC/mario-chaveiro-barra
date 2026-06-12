#!/bin/bash
# Gera todas as páginas de marca a partir do template
cd /sessions/sleepy-dazzling-lovelace/mnt/mario-chaveiro/mario-chaveiro-barra

brands=(
  "audi|Audi|Audi"
  "bmw|BMW|BMW"
  "cadillac|Cadillac|Cadillac"
  "chevrolet|Chevrolet|Chevrolet"
  "chrysler|Chrysler|Chrysler"
  "citroen|Citroën|Citro%C3%ABn"
  "dodge|Dodge|Dodge"
  "fiat|Fiat|Fiat"
  "ford|Ford|Ford"
  "honda|Honda|Honda"
  "hyundai|Hyundai|Hyundai"
  "jaguar|Jaguar|Jaguar"
  "jeep|Jeep|Jeep"
  "kia|Kia|Kia"
  "land-rover|Land Rover|Land%20Rover"
  "lexus|Lexus|Lexus"
  "mahindra|Mahindra|Mahindra"
  "mercedes|Mercedes-Benz|Mercedes"
  "mg-motors|MG Motors|MG%20Motors"
  "mitsubishi|Mitsubishi|Mitsubishi"
  "nissan|Nissan|Nissan"
  "peugeot|Peugeot|Peugeot"
  "porsche|Porsche|Porsche"
  "renault|Renault|Renault"
  "ssangyong|Ssangyong|Ssangyong"
  "subaru|Subaru|Subaru"
  "suzuki|Suzuki|Suzuki"
  "toyota|Toyota|Toyota"
  "volkswagen|Volkswagen|Volkswagen"
  "volvo|Volvo|Volvo"
)

make_outras_marcas() {
  local current_slug="$1"
  local html=""
  for entry in "${brands[@]}"; do
    IFS='|' read -r slug marca enc <<< "$entry"
    if [ "$slug" != "$current_slug" ]; then
      html+="<a href=\"../chaves-para-${slug}/\" class=\"brand-pill\">${marca}</a>"
    fi
  done
  echo "$html"
}

for entry in "${brands[@]}"; do
  IFS='|' read -r slug marca enc <<< "$entry"
  outras=$(make_outras_marcas "$slug")
  sed -e "s|__SLUG__|${slug}|g" \
      -e "s|__MARCA__|${marca}|g" \
      -e "s|__MARCA_ENC__|${enc}|g" \
      -e "s|__OUTRAS_MARCAS__|${outras}|g" \
      template-marca.html > "chaves-para-${slug}/index.html"
  echo "OK: chaves-para-${slug}/index.html"
done

echo "---"
echo "Total: $(ls -d chaves-para-*/ | wc -l) pastas"
