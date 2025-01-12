import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MyHeader from '../../components/MyHeader';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const QueueList = () => {
  const dataList = [
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
    {
      id: 1,
      name: 'Chandan Sharma',
      image:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
      sessionType: 'chat',
      time: '7m',
    },
  ];

  //   MaterialCommunityIcons

  // message-text-outline

  const MessageData = ({item}) => {
    return (
      <View style={styles.outcontainer}>
        <View style={styles.itemContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.imageContainer}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sessionType}>{item.sessionType}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MyHeader title="Queue List" />
      <FlatList
        data={dataList}
        renderItem={MessageData}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default QueueList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outcontainer: {
    paddingHorizontal: responsiveScreenWidth(2),
    paddingVertical: responsiveScreenHeight(0.3),
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    // fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sessionType: {
    // fontSize: 14,
    color: '#888',
  },
  time: {
    // fontSize: 12,
    color: '#555',
  },
});
