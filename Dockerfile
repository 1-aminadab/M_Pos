FROM reactnativecommunity/react-native-android:2.1
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install
COPY . ./

RUN chmod +x android/gradlew

RUN cd android && ./gradlew assembleRelease
