# migrate-create-react-app-to-bazel

The commit history of this repo attempts to tell a clear story of how to migrate the skeleton React 
application from `create-react-app` to something built with [bazel](https://bazel.build/).  We say
"attempts" because we are stuck at a step of the migration.

This example includes a couple realistic twists to capture common needs:

- The react app may not reside in the top directory of the Bazel WORKSPACE, but rather in its own
  subdirectory, as it's part of a larger project that includes backend services. Having the
  `package.json` in a subdirectory affects the setup of Bazel's NodeJS rules.
- The react app probably has custom components. We add a very simple custom component. After
  migrating the React app to a Bazel build, we then want to gradually pull our components from
  the full build into their own `ts_library` rules.
- The react app would be deployed someway. Here we simulate deploying in a docker container. This 
  lets us verify not just that we've migrated the basic JS build to Bazel, but also how that JS 
  build is incorporated fully into deployment.

Here's are the steps to migrate from create-react-app to a Bazel build:

1. [c64bc10](https://github.com/switchboard-software/migrate-create-react-app-to-bazel/commit/c64bc10c3d0138da80711980060d2bf11b19ded5)
   This is our "fully formed" React app. It's in its own subdirectory pretending to be part of a
   larger monorepo, it has a trivial custom component, and it's deployed in a docker container.
1. [6ee54d0](https://github.com/switchboard-software/migrate-create-react-app-to-bazel/commit/6ee54d0494ef9aa1b9c873bcc028d6e09ff2a423)
   First we use "eject" to get direct access to the build configuration that create-react-app
   has been using.
1. [4e9efbc](https://github.com/switchboard-software/migrate-create-react-app-to-bazel/commit/4e9efbcf557a816810c3c6809e1e20abbdd5c2d0)
   Next we simplify some of the build from create-react-app. Although these scripts are very
   handy if you completely inhabit the create-react-app world, they introduce complications trying 
   to fit into Bazel's world.
1. [3fa83e4](https://github.com/switchboard-software/migrate-create-react-app-to-bazel/commit/3fa83e4641284d67191fe12262003c1f6d219943)
   Now we finally use Bazel to run webpack and package the result into a container.
1. [ca39b6b](https://github.com/switchboard-software/migrate-create-react-app-to-bazel/commit/ca39b6b73c201487b6b99e184cc81f3ac460ead1)
   STUCK! Now that we are building and deploying with Bazel, we would like to begin gradually
   migrating one custom component at a time to Bazel's `ts_library` rule, each component with its
   set of JS and web tests.
