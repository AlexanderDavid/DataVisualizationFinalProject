const tweets = [
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
    timeLapsed: '5m',
    description: 'INTRODUCTION TO PROBLEM Misinformation on Twitter is rampant, coming to a head with the 2020 U.S. election. Large political accounts have been locked as to try to dissuade people with large audiences from spreading unsubstantiated rumors. One of the most important aspects in how any information propogates is the ',
    likes: 1256,
    upVoted: false
   },
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
    timeLapsed: '7m',
    description: 'DATASET DESCRIPTION',
    likes: 21,
    upVoted: false
   },
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
     timeLapsed: '10m',
    description: 'The following graph shows how much longer it takes for a False tweet to get discovered <div id="avg-retweet-chart"> </div>',
    likes: 36,
    upVoted: false
   },
   {
    name: 'Megan Fowler',
    userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/drizzy_twitter.png',
    handle: '@mefowler',
    verified: true,
    timeLapsed: '12m',
     description: 'MEGANS GRAPH',
    likes: 586,
    upVoted: false
   },
   {
    name: 'Xiaohong Zhang',
    userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/drizzy_twitter.png',
    handle: '@xiaohoz',
    verified: true,
    timeLapsed: '27m',
     description: 'XIAOHONGS GRAPH',
    likes: 486,
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
                <svg class="verified-icon" viewBox="0 0 24 24" aria-label="Verified account"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                <small>{{tweet.handle}}</small> · <small class="time-lapsed">{{tweet.timeLapsed}}</small>
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
        if (word[0] === '@') {
          word = `<a class="highlighted" href="https://twitter.com/${word.replace("@", "")}">${word}</a>`;
        }
        else if (word[0] === '#') {
          word = `<a class="highlighted" href="https://twitter.com/hashtag/${word.replace("#", "")}">${word}</a>`;
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
  },
});
