const dt = luxon.DateTime;

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: 'Michele',
          avatar: './img/avatar_1.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          id: 2,
          name: 'Fabiola',
          avatar: './img/avatar_6.jpg',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          id: 3,
          name: 'Samuele',
          avatar: './img/avatar_3.jpg',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          id: 4,
          name: 'Alessandro B.',
          avatar: './img/avatar_4.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
        {
          id: 5,
          name: 'Alessandro L.',
          avatar: './img/avatar_5.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ],
        },
        {
          id: 6,
          name: 'Claudia',
          avatar: './img/avatar_io.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ],
        },
        {
          id: 7,
          name: 'Federico',
          avatar: './img/avatar_7.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ],
        },
        {
          id: 8,
          name: 'Davide',
          avatar: './img/avatar_8.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
          ],
        }
      ],
      activeIndex: '',
      activeContact: '',
      searchText: '',
      newMessageText: '',
      visible: false,
      show: false,
      activeMessageIndex: ''
    }
  }, methods: {
    setActive(index) {
      this.visible = true;
      this.activeIndex = index;
      this.activeContact = this.contacts[index];
    },
    filterContacts() {
      this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
      }).forEach(contact => {
        contact.visible = true;
      });

      this.contacts.filter(contact => {
        return !contact.name.toLowerCase().includes(this.searchText.toLowerCase());
      }).forEach(contact => {
        contact.visible = false;
      });
    },
    sendMessage() {
      const newMessageText = this.newMessageText.trim();
      if (newMessageText !== '') {
        // Cancella la notifica "Non ci sono nuovi messaggi" se presente
        if (this.activeContact.messages.length === 1 && this.activeContact.messages[0].message === 'Non ci sono nuovi messaggi') {
          this.activeContact.messages = [];
        }

        // Aggiunge il nuovo messaggio
        const newMessage = {
          message: this.newMessageText,
          status: 'sent',
          date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS)
        };
        this.contacts[this.activeIndex].messages.push(newMessage);
        this.newMessageText = '';

        const possibleResponses = ['Ciao!',
          'Sto scrivendo del codice, ti chiamo io quando finisco',
          'oggi sono troppo pigro per alzarmi',
          'No, mi dispiace.',
          'Grazie mille!',
          'Vediamoci uno di questi giorni!',
          "si! non vedo l'ora!",
          'Ma i 10 euro che ti ho prestato?',
          'Si!',
          'No!',
          'Nooooooooooooooooooooooooooo',
          'che brutta notizia!',
          'Quanto costa?',
          'cu mancia fa muddichi',
          'Scusa',
          'oggi ti trovo in forma!',
          'Sappi che ho gambizzato per molto meno!',
          'lo so',
          'come ti permetti!?',
          'Ma tu lo sai chi sono io!?',
          '...',
          'eeeh! non ci sono più le mezze stagioni',
          'Signora mia! Qui è tutto un magna magna!',
          'evviva!',
          'wow',
          'non ci posso credere!',
          'mio zio terra-piattista mi ha detto il contrario!',
          'come scusa!?',
          "con un po' di omeopatia passa tutto",
          'eeeeh! si stava meglio quando si stava peggio',
          'non sono più giovane come quando avevo 80 anni'];
        const randomIndex = Math.floor(Math.random() * possibleResponses.length);
        const msgResponse = {
          message: possibleResponses[randomIndex],
          status: 'received',
          date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
        };

        setTimeout(() => {
          this.contacts[this.activeIndex].messages.push(msgResponse);
          this.$nextTick(() => {
            const lastMessage = this.$refs.activeContact[this.$refs.activeContact.length - 1];
            lastMessage.scrollIntoView();
          });
        }, 1500);
      }
    },
    goBack() {
      this.visible = false
    },
    showWindow(index) {
      this.activeMessageIndex = index;

      this.show = !this.show
    },
    cancelMsg() {
      if (this.activeContact.messages.length > 1) {
        this.activeContact.messages.splice(this.activeMessageIndex, 1);
      } else if (this.activeContact.messages.length === 1) {
        this.activeContact.messages = [{ message: "Non ci sono nuovi messaggi", status: "nothing", date: "" }];
      }
      this.show = false
    }


  }
}).mount('#app')
