document.addEventListener("DOMContentLoaded", () => {
    if (annyang) {

      const commands = {

        'hello': () => {
          console.log('Hello World!');
        },

        'change the color to *color': (color) => {
          document.body.style.backgroundColor = color.toLowerCase();
        },

        'navigate to *page': (page) => {
          const lowerPage = page.toLowerCase();
          const pages = {
            home: 'index.html',
            stocks: 'stocks.html',
            dogs: 'dogs.html',
          };
          if (pages[lowerPage]) {
            window.location.href = pages[lowerPage];
          }
        },
      };

      annyang.addCommands(commands);

      const turnOnAudioButton = document.getElementById('turn-on-audio');
      const turnOffAudioButton = document.getElementById('turn-off-audio');

      turnOnAudioButton.addEventListener('click', () => {
        annyang.start({ autoRestart: true, continuous: true });
        console.log('Audio commands activated.');
      });

      turnOffAudioButton.addEventListener('click', () => {
        annyang.abort();
        console.log('Audio commands deactivated.');
      });

      annyang.addCallback('soundstart', () => console.log('Sound detected.'));
      annyang.addCallback('result', (phrases) => console.log('Recognized phrases:', phrases));
      annyang.addCallback('error', (error) => console.error('Recognition error:', error));
      annyang.addCallback('errorNetwork', () => console.error('Network error detected.'));
      annyang.addCallback('errorPermissionBlocked', () =>
        console.error('Microphone access was blocked.')
      );
      annyang.addCallback('errorPermissionDenied', () =>
        console.error('Microphone access was denied.')
      );
    } else {
      console.error('Annyang is not supported in this browser.');
    }
  });

  