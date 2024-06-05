import { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';

// Define your GraphQL query and subscription
const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      text
      sender
    }
  }
`;

const MESSAGE_ADDED = gql`
  subscription messageAdded {
    messageAdded {
      id
      text
      sender
    }
  }
`;

// Create your custom hook
const useMessagesWithSubscription = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const { data: queryData } = useQuery(GET_MESSAGES, {
    onCompleted: (data) => {
      setMessages(data.messages);
    },
  });

  const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(
    MESSAGE_ADDED,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        setMessages((prevMessages) => [...prevMessages, subscriptionData.data.messageAdded]);
      },
    }
  );

  useEffect(() => {
    if (queryData) {
      setMessages(queryData.messages);
    }
  }, [queryData]);

  return { messages, subscriptionLoading };
};

export default useMessagesWithSubscription;



import { useEffect, useState } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';

const GET_DATA = gql`
  query getData {
    # ...
  }
`;

const DATA_UPDATED = gql`
  subscription onDataUpdated {
    # ...
  }
`;

const useDataWithSubscription = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const { data: queryData, refetch: refetchQuery, loading: queryLoading, error: queryError } = useQuery(GET_DATA, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setData(data.getData);
    },
  });

  const { data: subscriptionData, loading: subscriptionLoading, error: subscriptionError } = useSubscription(
    DATA_UPDATED,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        setData((prevData) => [...prevData, subscriptionData.data.dataUpdated]);
      },
    }
  );

  useEffect(() => {
    if (refetch) {
      refetchQuery();
      setRefetch(false);
    }
  }, [refetch, refetchQuery]);

  const handleRefetch = () => {
    setRefetch(true);
  };

  return {
    data,
    queryLoading,
    subscriptionLoading,
    queryError,
    subscriptionError,
    handleRefetch,
  };
};

const MyComponent = () => {
  const { data, queryLoading, subscriptionLoading, queryError, subscriptionError, handleRefetch } = useDataWithSubscription();

  if (queryLoading || subscriptionLoading) return <div>Loading...</div>;
  if (queryError || subscriptionError) return <div>Error!</div>;

  return (
    <div>
      <button onClick={handleRefetch}>Refetch</button>
      {/* Render data */}
    </div>
  );
};
