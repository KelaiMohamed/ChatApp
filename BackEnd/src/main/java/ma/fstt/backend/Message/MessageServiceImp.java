package ma.fstt.backend.Message;

import lombok.RequiredArgsConstructor;
import ma.fstt.backend.StringEncryptionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class MessageServiceImp implements MessageService {

    private final StringEncryptionService EncryptionService;
    private final MessageRepository messageRepository;

    @Value("${encryption.secretKey}")
    private String secretKey;

    @Override
    public void save(Message message) throws Exception {

        message.setContent(EncryptionService.encrypt(message.getContent(), secretKey));
        message.setSender(EncryptionService.encrypt(message.getSender(), secretKey));
        message.setReceiver(EncryptionService.encrypt(message.getReceiver(), secretKey));

        messageRepository.save(message);

    }

    @Override
    public List<Message> getAllByUser(String username) throws Exception {

        List<Message> list = messageRepository.getAllByUser(EncryptionService.encrypt(username, secretKey));


        for(Message message : list){
            message.setContent(EncryptionService.decrypt(message.getContent(), secretKey));
            message.setSender(EncryptionService.decrypt(message.getSender(), secretKey));
            message.setReceiver(EncryptionService.decrypt(message.getReceiver(), secretKey));
        }
        return list;
    }

}
