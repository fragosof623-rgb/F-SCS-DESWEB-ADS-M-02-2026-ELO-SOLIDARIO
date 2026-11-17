/* =========================================================
   Elo Solidário — Controles extras de mídia
   Usado em midia.html. JavaScript puro, sem bibliotecas.
   Aula 07, seção 9.3 (API de mídia: paused, play(), pause(),
   currentTime, volume) e desafio do Projeto A2 (pular para 1:30).
   O vídeo mantém o atributo controls: estes botões são extras.
   ========================================================= */

(() => {
  "use strict";

  const buscar = (id) => document.getElementById(id);

  /* ---------- Vídeo da TV Senado (elemento <video>) ---------- */
  const video = buscar("video-coleta");
  const botaoPlay = buscar("video-play");
  const botaoPular = buscar("video-pular");
  const botaoVolumeMenos = buscar("video-volume-menos");
  const botaoVolumeMais = buscar("video-volume-mais");
  const statusVideo = buscar("video-status");

  if (video && botaoPlay && botaoPular && botaoVolumeMenos && botaoVolumeMais && statusVideo) {
    const segundosParaPular = 90; // 1:30 (o vídeo tem 1:34)
    const passoVolume = 0.1;

    const avisar = (texto) => {
      statusVideo.textContent = texto;
    };

    // Deixa o botão igual ao estado real do vídeo (também quando a pessoa usa os controles nativos)
    const atualizarBotaoPlay = () => {
      const pausado = video.paused;
      botaoPlay.innerText = pausado ? "▶ Reproduzir" : "⏸ Pausar";
      botaoPlay.setAttribute("aria-label", pausado ? "Reproduzir o vídeo" : "Pausar o vídeo");
      botaoPlay.setAttribute("aria-pressed", String(!pausado));
    };

    botaoPlay.addEventListener("click", () => {
      if (video.paused) {
        // play() devolve uma Promise: ela falha se o navegador não conseguir tocar o arquivo
        video.play().catch(() => avisar("Não foi possível reproduzir o vídeo neste navegador."));
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", atualizarBotaoPlay);
    video.addEventListener("pause", atualizarBotaoPlay);
    video.addEventListener("ended", atualizarBotaoPlay);

    botaoPular.addEventListener("click", () => {
      video.currentTime = segundosParaPular;
      avisar("Vídeo posicionado em 1:30.");
    });

    // Volume vai de 0.0 a 1.0; arredondar evita somas como 0.30000000000000004
    const mudarVolume = (variacao) => {
      const novoVolume = Math.round((video.volume + variacao) * 10) / 10;
      video.volume = Math.min(1, Math.max(0, novoVolume));
      video.muted = false;
      const porcentagem = Math.round(video.volume * 100);
      if (novoVolume > 1) {
        avisar(`O volume já está no máximo (${porcentagem}%).`);
      } else if (novoVolume < 0) {
        avisar(`O volume já está no mínimo (${porcentagem}%).`);
      } else {
        avisar(`Volume: ${porcentagem}%.`);
      }
    };

    botaoVolumeMenos.addEventListener("click", () => mudarVolume(-passoVolume));
    botaoVolumeMais.addEventListener("click", () => mudarVolume(passoVolume));

    atualizarBotaoPlay();
  }

  /* ---------- Vídeo do YouTube (iframe): botão "Já assisti ao vídeo" ---------- */
  const botaoAssisti = buscar("botao-assisti");
  const statusAssisti = buscar("assisti-status");

  if (botaoAssisti && statusAssisti) {
    botaoAssisti.addEventListener("click", () => {
      statusAssisti.textContent = "Você assistiu ao vídeo sobre moeda social! Apoie a economia solidária.";
    });
  }
})();
