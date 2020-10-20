const tweets = [
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
    timeLapsed: '5m',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis diam non arcu fringilla dictum. Nullam dictum, nisl eu tempor aliquet, purus nisl porta mauris, et pulvinar mauris nunc non leo. Aliquam erat volutpat. Morbi cursus semper lacinia. Proin fermentum purus non ex convallis, viverra aliquam enim placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque mi odio, convallis in sapien nec, iaculis venenatis metus. In id diam nec ligula accumsan vulputate ultricies ut sem. Nam fringilla lobortis ex eget vehicula. Duis non justo at tortor suscipit iaculis quis quis mauris. Vivamus maximus suscipit viverra. Maecenas scelerisque purus turpis, et facilisis nunc sollicitudin tincidunt. Maecenas ac nisl quis lorem venenatis sollicitudin non vitae mi. Curabitur sodales velit quis finibus accumsan. Nunc sagittis vulputate neque, id tincidunt magna tempus a. Nam sollicitudin, lorem congue placerat posuere, felis felis porttitor lacus, non blandit nisl ex nec eros.`,
    likes: 1256,
    upVoted: false
   },
   {
    name: 'Megan Fowler',
    userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/drizzy_twitter.png',
    handle: '@mefowler',
    verified: true,
    timeLapsed: '15m',
    description: `Aenean accumsan ultricies congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis arcu vel leo dictum, quis efficitur lacus aliquet. Suspendisse fringilla tellus at nulla feugiat, nec rutrum urna iaculis. Nulla congue viverra ultrices. Suspendisse quis leo libero. Aenean ut porttitor augue. Vestibulum venenatis leo interdum ligula interdum tempor. Donec consequat eros vitae orci luctus dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam condimentum odio vitae justo mattis pharetra. Mauris sodales eu justo vitae aliquet. Sed dignissim finibus cursus.`,
    tweetImage: 'min_avg_retweet_time.svg',
    likes: 4586,
    upVoted: false
   },
   {
    name: 'Xiaohong Zhang',
    userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me-formal.jpg',
    handle: '@xiaohoz',
    timeLapsed: '1h',
    description: 'Quisque eget posuere arcu, nec aliquet ipsum. Pellentesque cursus volutpat turpis sed imperdiet. Quisque blandit sit amet tellus quis finibus. Suspendisse potenti. Ut vel est risus. Nam rhoncus finibus posuere. Nunc posuere commodo risus non consectetur. Donec ut iaculis diam. Suspendisse eu pharetra sem, eget bibendum massa. Mauris blandit eros gravida orci tincidunt dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus ullamcorper eros id ipsum maximus mollis.',
    likes: 36,
    upVoted: false
   },
]

Vue.component('tweet-component', {
  template:
  `
    <div class="tweet">
      <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img class="user-image" :src="tweet.userImage">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{tweet.name}}</strong>
                <img class="verified-icon"
                     src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png"
                     v-if="tweet.verified" />
                <small>{{tweet.handle}}</small>
                <small class="time-lapsed">{{tweet.timeLapsed}}</small>
                <br>
                <span class="description" v-html="computedDescription"></span>
              </p>
            </div>
            <div v-if="tweet.tweetImage" class="tweet-image">
              <img :src="tweet.tweetImage" />
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="far fa-comment"></i></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                </a>
                <a class="level-item heart" @click="like">
                  <span class="icon is-small">
                    <i class="far fa-heart"
                       :class="{'fas': this.tweet.upVoted}"></i>
                  </span>
                  <p :class="{'bold': this.tweet.upVoted}">
                    {{new Intl.NumberFormat().format(tweet.likes)}}
                  <p>
                </a>
              </div>
            </nav>
          </div>
        </article>
    </div>
  `,
  props: ['tweet'],
  computed: {
    computedDescription() {
      return this.tweet.description.split(' ').map((word) => {
        if (word[0] === '@' || word[0] === '#') {
          word = `<span class="highlighted">${word}</span>`;
        }
        return word;
      }).join(' ');
    }
  },
  methods: {
    like() {
      this.tweet.upVoted ? this.tweet.likes-- : this.tweet.likes++;
      this.tweet.upVoted = !this.tweet.upVoted;
    }
  }
});

new Vue({
  el: "#app",
  data: {
    tweets,
    image: '',
    description: '',
    step: null,
    showDetails: false,
    fileInput: ''
  },
  created() {
    setTimeout(() => {
      this.step = 1;
    }, 1000);
  },
  methods: {
    fileUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.image = files[0];
      this.createImage();
    },
    createImage() {
      const image = new Image();
      const reader = new FileReader();

      reader.onload = e => {
        this.image = e.target.result;
        this.step = 2;
      };
      reader.readAsDataURL(this.image);
    },
    uploadRandomImage() {
      const randomImages = [
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_mobile.png',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/cn-tower.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/prism-goggles-at-concert.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/working-at-night.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/busy-beach.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/grand-canyon.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/carnival-lights-at-dusk.jpg'
      ];
      
      this.image = randomImages[Math.floor(Math.random() * randomImages.length)];
      this.step = 2;
    },
    goToHome() {
      this.image = '';
      this.description = '';
      this.step = 1;
      
      this.$nextTick(() => {
        const feed = document.getElementById('feed');
        if (feed) feed.scrollTop = 0;
      });
    },
    shareTweet() {
      const tweet = {
        name: 'CodePen.IO',
        userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/codepen_logo.png',
        handle: '@CodePen',
        timeLapsed: '1m',
        tweetImage: this.image,
        description: this.description,
        likes: 0,
        upVoted: false,
      }
      
      this.tweets.unshift(tweet);
      this.goToHome();
    }
  }
});
