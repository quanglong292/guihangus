<template>
  <div>
    <v-timeline class="pb-12 d-none d-sm-block">
      <v-timeline-item hide-dot v-for="a in 4" :key="a"></v-timeline-item>
      <v-timeline-item fill-dot small>
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-5 pa-md-5">
          <h1 class="mb-5">AMET QUIS CONSECTETUR</h1>
          <p>
            Auctor vel rutrum purus egestas eu ut scelerisque cursus. Eros erat
            a ac tortor, sed ornare vel.
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item fill-dot small class="text-right">
        <div class="relativeTimeline reverseTimeline">01-01-20XX</div>
        <div
          class="timelineContent reverseTimelineContent text-left pa-5 pa-md-5"
        >
          <h1 class="mb-5">MALESUADA</h1>
          <p>
            Auctor nunc sed sed id. Egestas at aliquam dolor adipiscing ut. Quis
            facilisi dui urna, est pretium neque. Malesuada massa nisi
            consectetur vulputate etiam risus, duis. Enim a dui pulvinar lectus
            pellentesque aliquam tortor id.
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item hide-dot v-for="b in 16" :key="b + 4"></v-timeline-item>

      <v-timeline-item fill-dot small>
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-5 pa-md-5">
          <h1 class="mb-5">ET VOLUTPAT DUI LAOREET</h1>
          <p>
            Elementum, donec dolor nam maecenas ipsum blandit ultrices ut. Diam
            quis tellus at nunc, tincidunt mattis sagittis ac. Donec rhoncus
            turpis ut nulla.
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item fill-dot small class="text-right">
        <div class="relativeTimeline reverseTimeline">01-01-20XX</div>
        <div
          class="timelineContent reverseTimelineContent text-left pa-5 pa-md-5"
        >
          <h1 class="mb-5">RHONCUS FEUGIAT CRAS</h1>
          <p>
            Sit malesuada erat sit nibh. A viverra nam in volutpat feugiat
            varius. Euismod ac sem risus, in mauris sit viverra sit. Gravida non
            arcu euismod cras velit sit tortor pharetra. Nibh turpis cursus enim
            pellentesque.
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item hide-dot v-for="c in 16" :key="c + 20"></v-timeline-item>
      <v-timeline-item fill-dot small>
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-5 pa-md-5">
          <h1 class="mb-5">ET SAGITTIS MOLESTIE</h1>
          <p>
            Lacus et facilisis mauris in natoque gravida at. Feugiat iaculis
            donec lacinia integer porttitor sit. Semper proin diam convallis
            tincidunt non, id senectus amet. Vestibulum tellus praesent euismod
            tincidunt ipsum nunc sit mattis diam. Massa accumsan quam et, amet,
            viverra scelerisque.
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item fill-dot small class="text-right">
        <div class="relativeTimeline reverseTimeline">01-01-20XX</div>
        <div
          class="timelineContent reverseTimelineContent text-left pa-5 pa-md-5"
        >
          <h1 class="mb-5">ODIO ELEIFEND DIAM</h1>
          <p>
            Eu nunc in eget aliquam fames. Vestibulum in senectus arcu, cursus
            auctor senectus in sit. Sed odio vitae, scelerisque arcu nibh
            rhoncus, erat non morbi. Pharetra, amet vel dolor nisi, mauris non
            eget. Enim ullamcorper ultrices mi in pellentesque gravida.
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item hide-dot v-for="d in 10" :key="d + 36"></v-timeline-item>
    </v-timeline>
    <v-timeline class="pb-12 d-block d-sm-none" dense>
      <v-timeline-item fill-dot small class="pb-percent mt-12">
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-3">
          <h1 class="mb-3">MALESUADA</h1>
          <p>
            Auctor nunc sed sed id. Egestas at aliquam dolor adipiscing ut. Quis facilisi dui urna, est pretium neque. Malesuada massa nisi consectetur vulputate etiam risus, duis. Enim a dui pulvinar lectus pellentesque aliquam tortor id.
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item fill-dot small class="pb-percent">
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-3">
          <h1 class="mb-3">AMET QUIS CONSECTETUR</h1>
          <p>
            Auctor vel rutrum purus egestas eu ut scelerisque cursus. Eros erat a ac tortor, sed ornare vel. 
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item fill-dot small class="pb-percent mb-6">
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-3">
          <h1 class="mb-3">RHONCUS FEUGIAT CRAS</h1>
          <p>
            Sit malesuada erat sit nibh. A viverra nam in volutpat feugiat varius. Euismod ac sem risus, in mauris sit viverra sit. Gravida non arcu euismod cras velit sit tortor pharetra. Nibh turpis cursus enim pellentesque.
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item fill-dot small class="pb-percent mb-6">
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-3">
          <h1 class="mb-3">ET VOLUTPAT DUI LAOREET</h1>
          <p>
            Elementum, donec dolor nam maecenas ipsum blandit ultrices ut. Diam quis tellus at nunc, tincidunt mattis sagittis ac. Donec rhoncus turpis ut nulla. 
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item fill-dot small class="pb-percent mb-12">
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-3">
          <h1 class="mb-3">ODIO ELEIFEND DIAM</h1>
          <p>
            Eu nunc in eget aliquam fames. Vestibulum in senectus arcu, cursus auctor senectus in sit. Sed odio vitae, scelerisque arcu nibh rhoncus, erat non morbi. Pharetra, amet vel dolor nisi, mauris non eget. Enim ullamcorper ultrices mi in pellentesque gravida.
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item fill-dot small class="pb-percent">
        <div class="relativeTimeline">01-01-20XX</div>
        <div class="timelineContent pa-3">
          <h1 class="mb-3">ET SAGITTIS MOLESTIE</h1>
          <p>
            Lacus et facilisis mauris in natoque gravida at. Feugiat iaculis donec lacinia integer porttitor sit. Semper proin diam convallis tincidunt non, id senectus amet. Vestibulum tellus praesent euismod tincidunt ipsum nunc sit mattis diam. Massa accumsan quam et, amet, viverra scelerisque.
          </p>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
}
.relativeTimeline {
  border-bottom: 3px solid #06b7b4;
  max-width: 17%;
  text-align: center;
  float: left;
}
.timelineContent {
  position: absolute;
  left: 20%;
  top: -65px;
  background: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  h1 {
    text-transform: capitalize;
    color: black;
  }
}
.reverseTimelineContent {
  left: 0;
  right: 20%;
}
.reverseTimeline {
  float: right;
  max-width: 17%;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  .timelineContent {
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 12px;
    }
  }
  .relativeTimeline {
    font-size: 10px;
    max-width: 20%;
  }
}

@media only screen and (max-width: 600px) {
  .pb-percent {
    padding-bottom: 50%;
  }
  .timelineContent {
    left: 26%;
    h1 {
      font-size: 15px;
    }
    p {
      font-size: 10px;
    }
  }
  .relativeTimeline {
    max-width: 22%;
  }
  
}
</style>
