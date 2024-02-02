package ma.fstt.backend.RestController;

import lombok.RequiredArgsConstructor;
import ma.fstt.backend.Message.Message;
import ma.fstt.backend.Message.MessageService;
import ma.fstt.backend.User.User;
import ma.fstt.backend.User.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api/v1/message")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

    private final MessageService service;
    private final UserRepository userRepository;

    private Logger logger = LoggerFactory.getLogger(MessageController.class);

    @GetMapping()
    public List<MessageResponse> getAllByUser() throws Exception {

        // Retrieve the authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        List<MessageResponse> list = new ArrayList<>();

        List<Message> messages = service.getAllByUser(user.getUsername());

        boolean is_it_mine;
        String otherUsername;
        for(Message m : messages){

            if(Objects.equals(m.getSender(), user.getUsername())) {
                is_it_mine = true;
                otherUsername = m.getReceiver();
            }else {
                is_it_mine = false;
                otherUsername = m.getSender();
            }

            list.add(new MessageResponse(m.getContent(), m.getTimestamp(), is_it_mine, otherUsername));
        }
        logger.info(list.toString());

        return list;
    }

    @PostMapping
    public void createMessage(@RequestBody CreateMessageRequest request) throws Exception {

        // Retrieve the authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User sender = ((User) authentication.getPrincipal());

        if(userRepository.existsByUsername(request.getOtherUsername())) {


            var message = Message.builder()
                    .content(request.getContent())
                    .timestamp(request.getTimestamp())
                    .Sender(sender.getUsername())
                    .Receiver(request.getOtherUsername())
                    .build();

            service.save(message);
        }


    }



}
