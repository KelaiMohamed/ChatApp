package ma.fstt.backend.Message;


import java.util.List;

public interface MessageService {

    void save(Message message) throws Exception;

    List<Message> getAllByUser(String number) throws Exception;

}
