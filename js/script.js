const tweets = [
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
    timeLapsed: '5m',
    description: 'Misinformation on Twitter is rampant, coming to a head with the 2020 U.S. election. Large political accounts have been locked as to try to dissuade people with large audiences from spreading unsubstantiated rumors. Our analyis shows that misinformation is propogated by multiple smaller accounts whereas truths are spread by several big accounts within the network of Twitter users. This is shown mainly in the second graph although it is also visible in the whole of network visualization at the end of the page.',
    likes: 1256,
    upVoted: false
   },
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
    timeLapsed: '7m',
    description: 'We are using the Twitter15 <a href="#1">[1]</a> and Twitter16 <a href="#2">[2]</a> dataset as released by Ma et al. <a href="#3">[3]</a>. This dataset contains 2311 different tweet trees each centered on some root tweet with an average of 410 nodes and 415 edges. Each edges represents some interaction with the tweet via retweet or quote retweet and contains some value representing the time elapsed between the child and parent tweet. This dataset was created in order to perform machine learning in order to classify tweets as rumors or truth.',
    likes: 21,
    upVoted: false
   },
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
     timeLapsed: '10m',
    description: 'The following graph shows how much longer it takes for a False tweet to get discovered in compared to a Non-Rumor tweet. It is obvious that there is a large disparity between the average first retweet time. This can be explained by the fact that this misinformation starts at accounts with less of a following. Because of this the information begins in a less visibile space it takes longer for it to take hold. True statements, on the other hand, begin in highly visible spaces like large news accounts or other accounts with large followings. This leads to a lower discovery time. <div id="avg-retweet-chart"> </div>',
    likes: 36,
    upVoted: false
   },
   {
    name: 'Megan Fowler',
    userImage: 'https://pbs.twimg.com/profile_images/1216023025390424065/W50Dzo6u_400x400.jpg',
    handle: '@mefowler',
    verified: true,
    timeLapsed: '12m',
     description: 'Not all users retweet the same kind of information. This graph displays the types of tweets shared by each individual user as well as the amount of tweets shared. The larger the pie chart, the more the user retweeted. It appears that tweets labeled as non-rumor have many users who retweet, which may explain the large disparity between the average first retweet time.  <div id="packed-pie-chart" class="chart">',
    likes: 586,
    upVoted: false
   },
   {
    name: 'Xiaohong Zhang',
    userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/drizzy_twitter.png',
    handle: '@xiaohoz',
    verified: true,
    timeLapsed: '27m',
    description: 'The graphs below show two separate tweet networks. The one in green, on the left, represents a non-rumor network. With this network it is clear to see that there are multiple nodes that propogate the news to their component. These represent authorities of information that are reliable and spread truth more often than not. The other graph, in red and on the right, represents a false tweet network. It is clear to see that with this network there is only one clear malicious actor who spreads a majority of the misinformation. <div id="forcelinks"> </div> <!--<div style="text-align:center"><div id="non-rumor-graph" style="display:inline"></div><div id="false-graph" style="display:inline"></div></div>',
    likes: 486,
    upVoted: false
   },
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
    timeLapsed: '30m',
    description: "Now it's your turn to try and categorize the following graphs. The graph that shows up will either be a Non-Rumor or a False tweet. Use the radio buttons below to categorize the tweet and then check your answer with the next button. Remember to compare the graphs to the labeled graphs above. <div><div class='graph-select'><div style='height: 500px' id='network-select-graph'></div> <div class='controls'> <div class='graph-input'> <div> <input type='radio' id='non-rumor' name='graph' value='Non-Rumor' checked> <label for='non-rumor'>Non-Rumor</label> </div> <div> <input type='radio' id='false' name='graph' value='False'> <label for='false-tweet'>False</label> </div></div> <div class='next-button '><button id='next' class='btn btn-primary'>Next</button></div></div></div></div>",
    likes: 36,
    upVoted: false
   },
   {
    name: 'Alex Day',
    userImage: 'https://pbs.twimg.com/profile_images/1174730764375789573/LbaHHQnu_400x400.jpg',
    handle: '@ProbablyAlexDay',
    verified: true,
    timeLapsed: '33m',
    description: '<strong>References</strong><br><a id="1">[1]</a> Liu, Xiaomo, et al. "Real-time rumor debunking on twitter." Proceedings of the 24th ACM International on Conference on Information and Knowledge Management. 2015.<br><a id="2">[2]</a> Ma, Jing, et al. "Detecting rumors from microblogs with recurrent neural networks." 25th International Joint Conference on Artificial Intelligence, IJCAI 2016. International Joint Conferences on Artificial Intelligence, 2016.<br><a id="3">[3]</a> Ma, Jing, Wei Gao, and Kam-Fai Wong. "Detect rumors in microblog posts using propagation structure via kernel learning." Association for Computational Linguistics, 2017.',
    likes: 36,
    upVoted: false
   }
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
                  <svg viewBox="0 0 24 24" class="comment"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                </a>
                <a class="level-item">
                  <svg viewBox="0 0 24 24" class="retweet"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>                </a>
                <a class="level-item heart" @click="like">
                  <span class="icon is-small">
                    <svg class="like" :class="{'fas': this.tweet.upVoted}" viewBox="0 0 24 24" ><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                    <i
                       ></i>
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
